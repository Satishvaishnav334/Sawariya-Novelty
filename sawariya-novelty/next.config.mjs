/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    api: {
      bodyParser: false,
    },
    serverActions: {
      bodySizeLimit: '10mb', // or any value like '5mb', '20mb'

    },
  },
};



export default nextConfig;
