/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.arweave.net",
      },
    ],
    domains: [
      "ipfs.io",
      "ipfs.filebase.io",
      "ipfs.infura.io",
      "nftstorage.link",
      "aptoslabs.com",
      "miro.medium.com",
      "www.gitbook.com",
      'raw.githubusercontent.com',
    ],
  },
}

module.exports = nextConfig
