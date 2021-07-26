# FAQ

### Error: Cannot find module '<path>/backdrop-js/node_modules/@backdropjs/jsondb/dist/index.js'. Please verify that the package.json has a valid "main" entry

```
cd packages/server-nodejs
yarn remove @backdropjs/jsondb
yarn add @backdropjs/jsondb
```

This will fix the problem for now.
