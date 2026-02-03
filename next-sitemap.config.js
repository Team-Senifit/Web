/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://senifit.co.kr",
  generateRobotsTxt: true,
  outDir: "./public",
  sitemapSize: 5000,
  exclude: ["/api/*", "/login/*", "/_next/*", "/static/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/login/*", "/_next/*", "/static/*"],
      },
    ],
  },
  transform: async (_config, path) => ({
    loc: path,
    changefreq: path === "/" ? "daily" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
    lastmod: new Date().toISOString(),
  }),
};

module.exports = config;
