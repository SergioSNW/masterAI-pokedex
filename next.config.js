/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
  },
  // Mantenemos la directiva de ignorar errores de TypeScript
  // durante el build por la fricción de tipos de React 19
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
