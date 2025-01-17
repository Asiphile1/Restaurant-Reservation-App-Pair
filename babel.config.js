module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        [
          '@babel/plugin-transform-class-properties',
          { loose: true },  // Add loose: true
        ],
        [
          '@babel/plugin-transform-private-methods',
          { loose: true },  // Add loose: true
        ],
        [
          '@babel/plugin-transform-private-property-in-object',
          { loose: true },  // Add loose: true
        ],
      ],
    };
  };
  