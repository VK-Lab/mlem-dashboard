// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
  rewrites: () => {
    return [
      {
        source: '/rpc',
        destination: 'http://76.91.193.251:7777/rpc',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nftstorage.link',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'puffgo-static.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd2e-dev.s3.ap-southeast-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-southeast-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.eggforce.io',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            babel: true,
            titleProp: true,
          },
        },
        {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[hash:8].[ext]',
            limit: 500000,
          },
        },
      ],
    });

    return config;
  },
};
