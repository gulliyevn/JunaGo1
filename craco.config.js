const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Добавляем поддержку CSS модулей для TypeScript
      const cssRule = webpackConfig.module.rules.find(
        (rule) => rule.oneOf && Array.isArray(rule.oneOf)
      );

      if (cssRule && cssRule.oneOf) {
        // Находим правило для css файлов
        const cssModuleRule = cssRule.oneOf.find(
          (rule) => 
            rule.test && 
            rule.test.toString().includes('module\\.css')
        );

        if (cssModuleRule) {
          // Обновляем опции для CSS модулей
          cssModuleRule.use.forEach((loader) => {
            if (loader.options && loader.options.modules) {
              loader.options.modules = {
                ...loader.options.modules,
                exportLocalsConvention: 'camelCaseOnly',
              };
            }
          });
        }
      }

      // Игнорировать предупреждения о source maps для Monaco Editor
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        (warning) => warning.message.includes('source-map-loader')
      ];

      return webpackConfig;
    },
    plugins: {
      add: [
        new MonacoWebpackPlugin({
          languages: ['javascript', 'typescript', 'html', 'css', 'json', 'markdown'],
          filename: 'static/[name].worker.js',
          publicPath: '/'
        })
      ]
    }
  },
  typescript: {
    enableTypeChecking: true,
  },
}; 