import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add MiniCssExtractPlugin only for client-side builds
    if (!isServer) {
      // Push the MiniCssExtractPlugin instance to the Webpack plugins array
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].css',
          chunkFilename: 'static/css/[name].chunk.css',
        })
      );

      // Find and replace the default CSS loader configuration
      config.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((oneOfRule) => {
            if (oneOfRule.test && oneOfRule.test.toString().includes('css')) {
              oneOfRule.use = [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
              ];
            }
          });
        }
      });
    }

    return config;
  },
};

export default nextConfig;
