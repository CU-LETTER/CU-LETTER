module.exports = {
  siteUrl: "https://culetter.site",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://culetter.site/server-sitemap.xml"],
  },
  sitemapSize: 7000,
};
