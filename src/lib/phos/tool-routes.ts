/**
 * Which instrument the schema's tool names lead to. Kept apart from tools.ts,
 * which reaches into the entry index: the instruments page and the Portal only
 * want the routes, and a route table should not cost a hundred and fifty
 * kilobytes of front matter.
 */
/** Which of the seven planned instruments are live, and where. */
export const TOOL_ROUTES: Record<string, "/phos/tools/symbols" | "/phos/tools/traditions" | "/phos/tools/trace" | "/phos/tools/anatomy" | "/phos/tools/diagrams" | "/phos/tools/constellation" | "/phos/tools/atlas"> = {
  "Symbol Atlas": "/phos/tools/symbols",
  "Compare Traditions": "/phos/tools/traditions",
  "Trace a Concept": "/phos/tools/trace",
  "Luminous Anatomy": "/phos/tools/anatomy",
  "Diagram Library": "/phos/tools/diagrams",
  "The Constellation": "/phos/tools/constellation",
  "The Atlas": "/phos/tools/atlas",
};
