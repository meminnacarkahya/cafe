/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "picsum.photos" },
      { hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
