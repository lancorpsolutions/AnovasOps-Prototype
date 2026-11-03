import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: ({ children }) => <h2 className="text-2xl font-bold text-charcoal mt-10 mb-4">{children}</h2>,
  h2: ({ children }) => <h2 className="text-xl font-bold text-charcoal mt-10 mb-3">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-semibold text-charcoal mt-8 mb-2">{children}</h3>,
  h4: ({ children }) => <h4 className="text-base font-semibold text-charcoal mt-6 mb-2">{children}</h4>,
  p: ({ children }) => <p className="text-[15px] leading-7 text-gray-700 mb-5">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-2 text-[15px] leading-7 text-gray-700">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-2 text-[15px] leading-7 text-gray-700">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-orange pl-4 italic text-gray-600 my-6">{children}</blockquote>
  ),
  a: ({ href, children }) => {
    const external = href?.startsWith("http") && !href.includes("anovasintegratedsystems.com");
    return (
      <a
        href={href}
        className="text-orange font-medium underline underline-offset-2 hover:text-orange-light"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  strong: ({ children }) => <strong className="font-semibold text-charcoal">{children}</strong>,
  hr: () => <hr className="my-10 border-gray-200" />,
  code: ({ children }) => <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">{children}</code>,
  pre: ({ children }) => <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm mb-5">{children}</pre>,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold text-charcoal">{children}</th>,
  td: ({ children }) => <td className="border-b border-gray-200 px-3 py-2 text-gray-700">{children}</td>,
  img: ({ src, alt }) =>
    // eslint-disable-next-line @next/next/no-img-element
    typeof src === "string" ? <img src={src} alt={alt ?? ""} className="rounded-xl my-6 w-full h-auto" /> : null,
};

export function BlogMarkdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </ReactMarkdown>
  );
}
