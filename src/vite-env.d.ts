/// <reference types="vite/client" />

declare module "virtual:phos-portal" {
  const portal: {
    written: Record<string, number>;
    entrance: { n: number; id: string; slug: string; title: string; written: boolean; labels: string[]; summary: string }[];
  };
  export default portal;
}
