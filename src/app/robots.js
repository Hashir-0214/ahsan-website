export default function robots() {
  const baseUrl = "https://ahsan.sabeelulhidaya.info";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
