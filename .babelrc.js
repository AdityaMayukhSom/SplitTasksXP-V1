module.exports = {
    presets: ["babel-preset-expo"],
    // Temporarily comment out 'plugins' to see if NativeWind is the culprit
    // plugins: ['nativewind/babel'],
};

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: ["nativewind/babel"],
    };
};
