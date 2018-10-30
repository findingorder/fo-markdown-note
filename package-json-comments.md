For information on how to package for NPM, see:
https://medium.com/justfrontendthings/how-to-create-and-publish-your-own-vuejs-component-library-on-npm-using-vue-cli-28e60943eed3


Steps used here to package for NPM:
- In Vue CLI3 UI: Tasks > Build > Parameters, selected *Library* as the build target.
- In package.json, added the following:
```
"main": "./dist/fo-markdown-note.common.js",
"files": [
    "dist/*",
    "src/*",
    "public/*",
    "*.json",
    "*.js"
],
```
