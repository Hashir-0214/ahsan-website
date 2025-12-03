export default function sitemap() {
  const baseUrl = "https://ahsan.sabeelulhidaya.info";

  const routes = [
    "/",
    "/committee",
    "/contact",
    "/events",
    "/programs",
    "/publications",
    "/publications/annahda",
    "/publications/chromadiaries",
    "/publications/turuq",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
