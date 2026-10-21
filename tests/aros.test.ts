import { test } from "node:test";
import assert from "node:assert/strict";
import { calcOverall, calcPillarScores, getBand, getRoute, QUESTION_COUNT } from "../src/lib/diagnostic/aros";

test("there are ten questions", () => {
  assert.equal(QUESTION_COUNT, 10);
});

test("overall score spans the full 0–100 range", () => {
  assert.equal(calcOverall(Array(10).fill(1)), 0);
  assert.equal(calcOverall(Array(10).fill(4)), 100);
  assert.equal(calcOverall([3, 3, 2, 2, 1, 2, 3, 2, 3, 3]), 47);
});

test("bands follow the documented thresholds", () => {
  assert.equal(getBand(0).key, "foundation");
  assert.equal(getBand(25).key, "foundation");
  assert.equal(getBand(26).key, "building");
  assert.equal(getBand(50).key, "building");
  assert.equal(getBand(75).key, "growth");
  assert.equal(getBand(76).key, "scale");
});

test("routes to the weakest pillar, with Revenue winning ties", () => {
  assert.equal(getRoute(calcPillarScores([3, 3, 2, 2, 1, 2, 3, 2, 3, 3])), "autopilot-r");
  assert.equal(getRoute({ A: 1, R: 3, O: 3, S: 3 }), "services");
  assert.equal(getRoute({ A: 3, R: 3, O: 1, S: 3 }), "autopilot-o");
  assert.equal(getRoute({ A: 3, R: 3, O: 3, S: 1 }), "anovasos");
  assert.equal(getRoute({ A: 2, R: 2, O: 2, S: 2 }), "autopilot-r");
});
