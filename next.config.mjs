import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ucarecdn.com', 'unsplash.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add MiniCssExtractPlugin only for client-side builds
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].css',
          chunkFilename: 'static/css/[name].chunk.css',
        })
      );

      // Replace default CSS loader configuration
      const rules = config.module.rules.find((rule) => Array.isArray(rule.oneOf))?.oneOf || [];

      rules.forEach((rule) => {
        if (rule.test && rule.test.toString().includes('css')) {
          rule.use = [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ];
        }
      });
    }

    return config;
  },
};

export default nextConfig;
