/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: "incremental",
  },
  // output: "export",
  /**
    assetPrefix: "/out",
    basePath: "/out",  USE THIS WHEN BUILDING THE STATIC PAGE
   */
};

export default nextConfig;
