/** @type {import('next').NextConfig} */
const nextConfig = {
   // Configuration for the site to accept the utfs.io domain (Images)
   images: {
      remotePatterns: [{
         hostname: 'utfs.io',
      }]
   }
};

export default nextConfig;
