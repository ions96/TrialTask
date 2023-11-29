function getAliasesFromTsConfig() {
  const tsConfig = require('./tsconfig.json');

  const paths = tsConfig.compilerOptions.paths;
  let alias = {};
  Object.keys(paths).forEach(key => {
    alias[key.replace(/\/\*$/, '')] = `./${paths[key][0].replace(/\/\*$/, '')}`;
  });

  return alias;
}

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: getAliasesFromTsConfig(),
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['./app/'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
