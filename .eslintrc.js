module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        // "indent": [ "error", 4 ],
        // "quotes": [ "error", "single" ],
        "linebreak-style": [ "error", "windows" ],
        "semi": [ "error", "always" ],
        "no-unused-vars": ["error", { "argsIgnorePattern": "^next$", "varsIgnorePattern": "^ignored" }],
        "no-constant-condition": ["error", { "checkLoops": false }],
        "strict": "off",
        "no-console": "off"
    },
    "globals": {
        "app_require": false,
        "describe": false,
        "it": false,
        "before": false,
        "after": false
    }
};