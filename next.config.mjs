/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    PROGRAM_CODE: process.env.PROGRAM_CODE,
  },
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
