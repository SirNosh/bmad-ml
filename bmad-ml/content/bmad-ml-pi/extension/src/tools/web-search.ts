export function createWebSearchTool() {
  return {
    name: "web_search",
    label: "Web search",
    description: "Generate a provider-agnostic web search URL for manual verification.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
      },
      required: ["query"],
    },
    execute: async (_toolCallId: string, params: Record<string, unknown>) => {
      const query = String(params.query ?? "").trim();
      const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      return {
        content: [{ type: "text", text: `Search URL: ${url}` }],
      };
    },
  };
}
