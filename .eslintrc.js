module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
    },
    plugins: [
        "import",
        "unused-imports",
        "@typescript-eslint/eslint-plugin",
        "header",
        "compat",
    ],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended",
        "plugin:you-dont-need-lodash-underscore/compatible",
        "plugin:import/recommended",
        "plugin:import/typescript",
    ],
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    },
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "comma-dangle": [
            "error",
            {
                "arrays": "always-multiline",
                "objects": "always-multiline",
                "imports": "always-multiline",
                "exports": "always-multiline",
                "functions": "never"
            }
        ],

        "array-bracket-newline": ["error", { "multiline": true, "minItems": 6 }],
        "array-element-newline": ["error", { "multiline": true, "minItems": 6 }],
        "array-bracket-spacing": ["error", "always"],

        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                args: "none",
                argsIgnorePattern: "^_",
                caughtErrors: "all",
                caughtErrorsIgnorePattern: "^_",
                ignoreRestSiblings: true,
                varsIgnorePattern: "^_",
            },
        ],
        "no-duplicate-imports": "error",
        "no-else-return": ["error", { allowElseIf: true }],
        "no-console": "error",
        "no-return-assign": "error",
        "no-return-await": "error",
        "no-useless-return": "error",
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-destructuring": "error",
        "space-before-blocks": "error",
        // "require-await": "error",
        
        "import/order": [
            "error",
            {
                "groups": [
                    ["builtin", "external"],
                    "internal",
                    ["parent", "sibling"],
                    "index"
                ],
                "newlines-between": "always",
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true
                }
            }
        ],
        "import/newline-after-import": ["error", { count: 1 }],
        "import/no-duplicates": "error",

        "sort-imports": [
            "error",
            {
                "ignoreCase": true,
                "ignoreDeclarationSort": true,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
            }
        ],

        "import/extensions": [
            "error",
            "always",
            { 
                js: "never", 
                jsx: "never", 
                ts: "never", 
                tsx: "never", 
                mjs: "never", 
                json: "always" 
            },
            
        ],
        "import/no-webpack-loader-syntax": ["error"],
        

        "semi-spacing": ["error", { before: false, after: true }],
        "spaced-comment": ["error", "always", { line: { exceptions: ["-", "*", "+"] } }],
        "switch-colon-spacing": ["error", { after: true, before: false }],
        "template-curly-spacing": ["error", "never"],
        "wrap-iife": ["error", "outside"],
        "wrap-regex": "error",
        "yield-star-spacing": ["error", "before"],
        "yoda": "error",
        "eol-last": ["error", "always"],
        "eqeqeq": ["error", "always"],
        "func-style": ["error", "expression"],
        "max-params": ["error", 4],
        "newline-before-return": "error",
        "no-await-in-loop": "error",
        "no-dupe-else-if": "error",
        "padding-line-between-statements": [
            'error',
            { "blankLine": "always", "prev": "class", "next": "*" },
        ],

        "no-template-curly-in-string": "error",
        "no-unsafe-optional-chaining": "error",
        "no-duplicate-case": "error",
        "no-extra-semi": "error",
        "no-eq-null": "error",
        "no-eval": "error",
        "default-case-last": "error",
        "default-param-last": "error",
        "no-fallthrough": "error",
        "no-lone-blocks": "error",
        "no-new-wrappers": "error",
        "no-import-assign": "error",
        "no-new-object": "error",
        "no-proto": "error",
        "no-array-constructor": "error",
        "no-var": "error",
        "no-inline-comments": "error",
        "prefer-rest-params": "error",
        
        "header/header": [
            "error",
            "block",
            [
                "",
                " *************************",
                {
                    pattern: " \tCopyright \\d{4}-\\d{4}",
                    template: " \tCopyright 2023-2024",
                },
                " \t\tNest Rocks",
                " *************************",
                "",
            ],
            2,
        ],
        
        "object-curly-spacing": ["error", "always", { "arraysInObjects": false, "objectsInObjects": false }],
        "max-len": [
            "error",
            { 
                "code": 150,
                "tabWidth": 4,
                "comments": 150,
                "ignoreUrls": true,
                "ignorePattern": "^\\s*\\[.*\\]$|^\\s*\\{.*\\}$",
                "ignoreTrailingComments": true,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true,
                "ignoreRegExpLiterals": true
            }
        ],
        "semi": [
            "error",
            "always",
            {
                "omitLastInOneLineBlock": true
            }
        ],
        "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
        "no-unused-vars": [
            "error",
            {
                "args": "all",
                "argsIgnorePattern": "^_",
                "caughtErrors": "none",
                "destructuredArrayIgnorePattern": "^_",
                "ignoreRestSiblings": true
            }
        ],
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }]
    },
};

