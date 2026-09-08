import { useEffect } from "react";

function setMeta(selector: string, attr: "content" | "href", value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function usePageMeta(options: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "product";
}) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = options.title;
    setMeta('meta[name="description"]', "content", options.description);
    setMeta('link[rel="canonical"]', "href", options.url);
    setMeta('meta[property="og:title"]', "content", options.title);
    setMeta('meta[property="og:description"]', "content", options.description);
    setMeta('meta[property="og:url"]', "content", options.url);
    setMeta('meta[property="og:type"]', "content", options.type ?? "website");
    setMeta('meta[name="twitter:title"]', "content", options.title);
    setMeta('meta[name="twitter:description"]', "content", options.description);

    return () => {
      document.title = prevTitle;
    };
  }, [options.title, options.description, options.url, options.type]);
}
