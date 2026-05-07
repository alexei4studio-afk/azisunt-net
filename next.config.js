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
        source: "/blog/cum-sa-crezi-o-experienta-de-cumparare-omnichanel-pentru-clienti-tai",
        destination: "/blog/transforma-vizitatori-in-clienti",
        permanent: true,
      },
      {
        source: "/blog/cum-sa-crezi-un-program-de-fidelitate-pentru-clienti-tai-online-si-ofline",
        destination: "/blog/transforma-vizitatori-in-clienti",
        permanent: true,
      },
      {
        source: "/blog/optimizarea-continutului-pentru-afaceri-locale-cum-sa-scri-titluri-si-descrieri-meta-eficiente",
        destination: "/blog/cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",
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

      {
        source: "/blog/structura-site-afacere-mica",
        destination: "/blog/structura-site-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/de-ce-un-site-simplu-aduce-mai-multi-clienti",
        destination: "/blog/structura-site-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/site-simplu-vinde-mai-bine",
        destination: "/blog/structura-site-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/afaceri-mici-si-site-web",
        destination: "/blog/structura-site-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/de-ce-afacerile-mici-au-nevoie-de-un-site",
        destination: "/blog/structura-site-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/pagina-principala-afaceri-mici",
        destination: "/blog/structura-site-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/greseli-site-afaceri-mici",
        destination: "/blog/structura-site-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/tendinte-in-designul-site-urilor-web-pentru-afaceri-locale-in-2026",
        destination: "/blog/structura-site-afacere-locala",
        permanent: true,
      },

      {
        source: "/blog/efectul-recenzilor-online-asupra-afacerilor-locale-cum-sa-incurajezi-clienti-sa-lase-recenzi-pozitive",
        destination: "/blog/cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/optimizarea-continutului-pentru-afaceri-locale-cum-sa-scrii-titluri-si-descrieri-meta-eficiente",
        destination: "/blog/cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/geo-chatgpt-perplexity",
        destination: "/blog/cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/ai-seo-pentru-afaceri-locale-2026",
        destination: "/blog/cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/ai-seo-marketing-2026-1777803585",
        destination: "/blog/cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",
        permanent: true,
      },
      {
        source: "/blog/seo-ai-hijacking",
        destination: "/blog/cum-sa-atragi-clienti-din-google-pentru-o-afacere-locala",
        permanent: true,
      },

      {
        source: "/blog/cum-sa-utilizezi-platformele-de-publicitate-online-pentru-a-ti-creste-vanzarile-in-randul-clientilor-locali",
        destination: "/blog/transforma-vizitatori-in-clienti",
        permanent: true,
      },
      {
        source: "/blog/cum-sa-creezi-o-experienta-de-cumparare-omnichannel-pentru-clientii-tai",
        destination: "/blog/transforma-vizitatori-in-clienti",
        permanent: true,
      },
      {
        source: "/blog/cum-sa-creezi-un-program-de-fidelitate-pentru-clientii-tai-online-si-offline",
        destination: "/blog/transforma-vizitatori-in-clienti",
        permanent: true,
      },
      {
        source: "/blog/cum-sa-folosesti-retelele-sociale-pentru-a-promova-afacerile-locale-si-a-atrage-clienti-noi",
        destination: "/blog/transforma-vizitatori-in-clienti",
        permanent: true,
      },
      {
        source: "/blog/cum-sa-folosesti-influenceri-locali-pentru-a-promova-afacerile-tale",
        destination: "/blog/transforma-vizitatori-in-clienti",
        permanent: true,
      },

      {
        source: "/blog/p1",
        destination: "/blog/automatizare-ai-afaceri-locale",
        permanent: true,
      },
      {
        source: "/blog/ai-si-timpul-pierdut-cu-taskuri-repetitive",
        destination: "/blog/automatizare-ai-afaceri-locale",
        permanent: true,
      },
      {
        source: "/blog/automatizare-startfirma",
        destination: "/blog/automatizare-ai-afaceri-locale",
        permanent: true,
      },
      {
        source: "/blog/sistemul-de-autoritate",
        destination: "/blog/automatizare-ai-afaceri-locale",
        permanent: true,
      },
      {
        source: "/blog/2026-04-19-meta-agenti-ai-automatizare-infrastructura",
        destination: "/blog/automatizare-ai-afaceri-locale",
        permanent: true,
      },

      {
        source: "/blog/metode-de-promovare-a-afacerilor-locale-prin-intermediul-evenimentelor-comunitare",
        destination: "/blog/strategii-de-marketing-pentru-afaceri-locale-in-orase-mici",
        permanent: true,
      },
      {
        source: "/blog/cum-sa-imbunatatesti-strategia-ta-de-marketing-cu-ajutorul-datelor",
        destination: "/blog/strategii-de-marketing-pentru-afaceri-locale-in-orase-mici",
        permanent: true,
      },
      {
        source: "/blog/p2",
        destination: "/blog/strategii-de-marketing-pentru-afaceri-locale-in-orase-mici",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
