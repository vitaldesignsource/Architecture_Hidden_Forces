/**
 * What a page tells a search engine and a link preview: its title, a sentence
 * that says what it is, and the same pair again in the form previews read.
 * Every route's head goes through here, so no page is missing one.
 */
export function describe(title: string, description: string, image?: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    ...(image
      ? [{ property: "og:image", content: `/bg/${image}.webp` }, { name: "twitter:card", content: "summary_large_image" }]
      : [{ name: "twitter:card", content: "summary" }]),
  ];
}
