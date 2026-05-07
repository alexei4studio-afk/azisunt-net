/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/blog": ["./content/blog/**/*"],
    },
  },

  async redirects() {
    return [
      {
        source: "/blog/cum-sa-atragi-clienti-din-gogle-pentru-o-afacere-locala",
        destination: "/blog/cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/cum-sa-crezi-o-experienta-de-cumparare-omnichanel-pentru-clienti-tai",
        destination: "/blog/cum-sa-creezi-o-experienta-de-cumparare-omnichannel-pentru-clientii-tai",
        permanent: true,
      },
      {
        source: "/blog/cum-sa-crezi-un-program-de-fidelitate-pentru-clienti-tai-online-si-ofline",
        destination: "/blog/cum-sa-creezi-un-program-de-fidelitate-pentru-clientii-tai-online-si-offline",
        permanent: true,
      },
      {
        source: "/blog/optimizarea-continutului-pentru-afaceri-locale-cum-sa-scri-titluri-si-descrieri-meta-eficiente",
        destination: "/blog/optimizarea-continutului-pentru-afaceri-locale-cum-sa-scrii-titluri-si-descrieri-meta-eficiente",
        permanent: true,
      },
      {
        source: "/blog/strategi-de-marketing-pentru-afaceri-locale-in-orase-mici",
        destination: "/blog/strategii-de-marketing-pentru-afaceri-locale-in-orase-mici",
        permanent: true,
      },
      {
        source: "/blog/structura-site-afacere-locaala",
        destination: "/blog/structura-site-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/transforma-vizitatori-in-clients",
        destination: "/blog/transforma-vizitatori-in-clienti",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
