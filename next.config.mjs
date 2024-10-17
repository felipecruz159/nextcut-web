/** @type {import('next').NextConfig} */
const nextConfig = {
   // Configuration for the site to accept the utfs.io domain (Images)
   images: {
      remotePatterns: [{
         hostname: 'utfs.io',
         protocol: 'http',
         hostname: 'localhost',
         port: '3333',
         pathname: '/public/barberShop/**',
      }]
   }
};

export default nextConfig;
