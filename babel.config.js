module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ["module-resolver", {
                root: ["."], // Указываем корневой путь
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                alias: {
                    "@app": "./app",
                    "@components": "./app/components",
                    "@styles": "./app/styles",
                    "@screens": "./app/screens",
                    "@navigation": "./app/navigation",
                    "@providers": "./app/providers"
                }
            }],
            "react-native-reanimated/plugin",
        ]
    };
};
