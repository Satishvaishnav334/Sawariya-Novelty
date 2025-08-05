/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // or any value like '5mb', '20mb'
    },
  },
};


export default nextConfig;
