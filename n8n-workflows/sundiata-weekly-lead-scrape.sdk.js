import { workflow, node, trigger, sticky, newCredential, splitInBatches, nextBatch, expr } from '@n8n/workflow-sdk';

const weeklyTrigger = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.3,
  config: {
    name: 'Sat & Sun 5am',
    parameters: {
      rule: { interval: [{ field: 'cronExpression', expression: '0 5 * * 6,0' }] }
    }
  },
  output: [{}]
});

const getExistingCompanies = node({
  type: 'n8n-nodes-base.hubspot',
  version: 2.2,
  config: {
    name: 'Get Existing Companies',
    parameters: {
      authentication: 'oAuth2',
      resource: 'company',
      operation: 'getAll',
      returnAll: true,
      options: {
        propertiesCollection: {
          propertiesValues: { properties: ['name', 'domain', 'phone', 'city', 'state'], propertyMode: 'valueOnly' }
        }
      }
    },
    credentials: { hubspotOAuth2Api: newCredential('HubSpot OAuth2 API') }
  },
  output: [{ companyId: '111', properties: { name: { value: 'Acme HVAC' }, city: { value: 'Conway' } } }]
});

const cacheExistingCompanies = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Cache Existing Companies',
    executeOnce: true,
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode:
        "const STOP = ['llc','inc','co','company','companies','the','heating','cooling','air','conditioning','plumbing','electric','electrical','mechanical','service','services','hvac','rooter','drain','sewer','contractor','contracting','painting','landscaping','pest','control','cleaning','roofing'];\n" +
        "function norm(s){ return (s||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(' ').filter(function(w){ return w && STOP.indexOf(w) < 0; }).sort().join(' '); }\n" +
        "const data = $getWorkflowStaticData('global');\n" +
        "const names = {};\n" +
        "const domains = {};\n" +
        "for (const item of $input.all()) {\n" +
        "  const p = item.json.properties || {};\n" +
        "  const get = (k) => { const v = p[k]; return v && typeof v === 'object' ? (v.value || '') : (v || ''); };\n" +
        "  const key = norm(get('name'));\n" +
        "  if (key) names[key] = true;\n" +
        "  const domain = (get('domain') || '').toLowerCase().trim();\n" +
        "  if (domain) domains[domain] = true;\n" +
        "}\n" +
        "data.existingNames = names;\n" +
        "data.existingDomains = domains;\n" +
        "data.newLeads = [];\n" +
        "data.leadKeys = {};\n" +
        "data.scrapedCount = 0;\n" +
        "data.dupCount = 0;\n" +
        "data.capReached = false;\n" +
        "return [{ json: { existingCount: $input.all().length } }];"
    }
  },
  output: [{ existingCount: 412 }]
});

const buildQueryGrid = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Build Query Grid',
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode:
        "const cities = ['Little Rock','North Little Rock','Conway','Fayetteville','Springdale','Rogers','Bentonville','Jonesboro'];\n" +
        "const categories = ['HVAC contractor','plumber','electrician','roofing contractor','landscaping company','painting contractor','cleaning service','general contractor','pest control service'];\n" +
        "const items = [];\n" +
        "for (const city of cities) {\n" +
        "  for (const category of categories) {\n" +
        "    items.push({ json: { city, category, query: category + ' in ' + city + ', AR' } });\n" +
        "  }\n" +
        "}\n" +
        "return items;"
    }
  },
  output: [{ city: 'Little Rock', category: 'HVAC contractor', query: 'HVAC contractor in Little Rock, AR' }]
});

const loopQueries = splitInBatches({
  version: 3,
  config: { name: 'Loop Queries (72 max)', parameters: { batchSize: 1 } }
});

const googlePlacesSearch = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.4,
  config: {
    name: 'Google Places Text Search',
    onError: 'continueRegularOutput',
    parameters: {
      method: 'POST',
      url: 'https://places.googleapis.com/v1/places:searchText',
      authentication: 'genericCredentialType',
      genericAuthType: 'httpHeaderAuth',
      sendHeaders: true,
      headerParameters: {
        parameters: [
          { name: 'X-Goog-FieldMask', value: 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri' }
        ]
      },
      sendBody: true,
      specifyBody: 'json',
      jsonBody: expr('={ "textQuery": "{{ $json.query }}", "maxResultCount": 20, "regionCode": "US" }'),
      options: { response: { response: { neverError: true } } }
    },
    credentials: { httpHeaderAuth: newCredential('Header Auth account') }
  },
  output: [{ places: [{ id: 'p1', displayName: { text: 'Acme HVAC' }, formattedAddress: '123 Main St, Little Rock, AR', nationalPhoneNumber: '(501) 555-0100', websiteUri: 'https://acmehvac.com' }] }]
});

const extractAndFilterLeads = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Extract & Filter New Leads',
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode:
        "const STOP = ['llc','inc','co','company','companies','the','heating','cooling','air','conditioning','plumbing','electric','electrical','mechanical','service','services','hvac','rooter','drain','sewer','contractor','contracting','painting','landscaping','pest','control','cleaning','roofing'];\n" +
        "function norm(s){ return (s||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(' ').filter(function(w){ return w && STOP.indexOf(w) < 0; }).sort().join(' '); }\n" +
        "const data = $getWorkflowStaticData('global');\n" +
        "const queryItem = $('Loop Queries (72 max)').item.json;\n" +
        "const resp = $input.first().json || {};\n" +
        "const places = resp.places || [];\n" +
        "data.scrapedCount += places.length;\n" +
        "const CAP = 150;\n" +
        "for (const place of places) {\n" +
        "  if (data.newLeads.length >= CAP) { data.capReached = true; break; }\n" +
        "  const name = (place.displayName && place.displayName.text) || '';\n" +
        "  const key = norm(name);\n" +
        "  if (!key) continue;\n" +
        "  const domain = (place.websiteUri || '').toLowerCase().replace(/^https?:\\/\\//,'').replace(/^www\\./,'').split('/')[0];\n" +
        "  const isDup = data.existingNames[key] || data.leadKeys[key] || (domain && data.existingDomains[domain]);\n" +
        "  if (isDup) { data.dupCount++; continue; }\n" +
        "  data.leadKeys[key] = true;\n" +
        "  data.newLeads.push({\n" +
        "    name,\n" +
        "    domain,\n" +
        "    phone: place.nationalPhoneNumber || '',\n" +
        "    address: place.formattedAddress || '',\n" +
        "    city: queryItem.city,\n" +
        "    category: queryItem.category,\n" +
        "    placeId: place.id || ''\n" +
        "  });\n" +
        "}\n" +
        "return [{ json: { city: queryItem.city, category: queryItem.category, found: places.length } }];"
    }
  },
  output: [{ city: 'Little Rock', category: 'HVAC contractor', found: 12 }]
});

const finalizeNewLeads = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Finalize New Leads',
    executeOnce: true,
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode:
        "const data = $getWorkflowStaticData('global');\n" +
        "const leads = data.newLeads || [];\n" +
        "return leads.map(function(l){ return { json: l }; });"
    }
  },
  output: [{ name: 'Acme HVAC', domain: 'acmehvac.com', phone: '(501) 555-0100', address: '123 Main St, Little Rock, AR', city: 'Little Rock', category: 'HVAC contractor', placeId: 'p1' }]
});

const createCompaniesLoop = splitInBatches({
  version: 3,
  config: { name: 'Create Companies Loop', parameters: { batchSize: 1 } }
});

const createCompany = node({
  type: 'n8n-nodes-base.hubspot',
  version: 2.2,
  config: {
    name: 'Create HubSpot Company',
    onError: 'continueRegularOutput',
    parameters: {
      authentication: 'oAuth2',
      resource: 'company',
      operation: 'create',
      name: expr('={{ $json.name }}'),
      additionalFields: {
        domain: expr('={{ $json.domain }}'),
        phone: expr('={{ $json.phone }}'),
        city: expr('={{ $json.city }}'),
        state: 'AR',
        description: expr('={{ $json.category }} lead found via weekly Google Places scrape ({{ $json.address }})')
      }
    },
    credentials: { hubspotOAuth2Api: newCredential('HubSpot OAuth2 API') }
  },
  output: [{ companyId: '999', properties: { name: { value: 'Acme HVAC' } } }]
});

const computeSummary = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Compute Summary',
    executeOnce: true,
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode:
        "const data = $getWorkflowStaticData('global');\n" +
        "const created = (data.newLeads || []).length;\n" +
        "const summaryText = ':mag: *Weekly Lead Scrape*\\n' +\n" +
        "  '8 cities x 9 categories scanned (72 queries)\\n' +\n" +
        "  '*Places found:* ' + (data.scrapedCount || 0) + '\\n' +\n" +
        "  '*Duplicates skipped:* ' + (data.dupCount || 0) + '\\n' +\n" +
        "  '*New companies created:* ' + created + (data.capReached ? ' (150 cap reached)' : '') + '\\n' +\n" +
        "  'Enrichment workflow queued to fill in any missing phone numbers.';\n" +
        "return [{ json: { summaryText, created } }];"
    }
  },
  output: [{ summaryText: ':mag: *Weekly Lead Scrape*\nNew companies created: 37', created: 37 }]
});

const callEnrichment = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.2,
  config: {
    name: 'Call Lead Enrichment Workflow',
    executeOnce: true,
    onError: 'continueRegularOutput',
    parameters: {
      source: 'database',
      workflowId: { __rl: true, mode: 'id', value: 'T6s2HqNC3vlNA7Pq' }
    }
  },
  output: [{ companyId: '999', confidence: 'HIGH' }]
});

const postSlackSummary = node({
  type: 'n8n-nodes-base.slack',
  version: 2.3,
  config: {
    name: 'Post Slack Summary',
    executeOnce: true,
    onError: 'continueRegularOutput',
    parameters: {
      resource: 'channel',
      select: 'channel',
      channelId: 'C0B9293Q56G',
      text: expr("={{ $('Compute Summary').item.json.summaryText }}"),
      otherOptions: { includeLinkToWorkflow: false }
    },
    credentials: { slackApi: newCredential('Slack account') }
  },
  output: [{ ok: true }]
});

const setupNote = sticky(
  '## Sundiata — Weekly Lead Scrape\nRuns Saturday and Sunday at 5am. Scrapes Google Places across 8 Arkansas cities x 9 service categories (72 queries), skips anything already in HubSpot (matched by normalized name or domain), creates new HubSpot companies (capped at 150/run), calls the Lead Enrichment workflow to fill in phone numbers, then posts a summary to #sales.\n\nConfirm the n8n instance timezone is set to Central so the 5am trigger fires at 5am Central, not UTC.',
  [weeklyTrigger, getExistingCompanies, cacheExistingCompanies, buildQueryGrid],
  { color: 4 }
);

export default workflow('sundiata-weekly-lead-scrape', 'Sundiata — Weekly Lead Scrape')
  .add(weeklyTrigger)
  .to(getExistingCompanies)
  .to(cacheExistingCompanies)
  .to(buildQueryGrid)
  .to(
    loopQueries
      .onEachBatch(googlePlacesSearch.to(extractAndFilterLeads).to(nextBatch(loopQueries)))
      .onDone(
        finalizeNewLeads.to(
          createCompaniesLoop
            .onEachBatch(createCompany.to(nextBatch(createCompaniesLoop)))
            .onDone(computeSummary.to(callEnrichment).to(postSlackSummary))
        )
      )
  )
  .add(setupNote);
