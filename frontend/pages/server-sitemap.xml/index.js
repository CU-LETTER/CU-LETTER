import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const fields = [
    {
      loc: "https://culetter.site",
      lastmod: new Date().toISOString(),
    },
  ];
  return getServerSideSitemap(ctx, fields);
};

export default () => {};
