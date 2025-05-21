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

      return webpackConfig;
    },
  },
  typescript: {
    enableTypeChecking: true,
  },
}; 