# Backdrop-js (Monorepo)

## Developer Guide

### Getting Started

```
git clone git@github.com:thinkholic/backdrop-js.git
cd backdrop-js
yarn
```

> Duplicate `packages/server-nodejs/.env.example` to `packages/server-nodejs/.env`, and update keys as needed.

#### Run

- Server - `yarn start:server`
- Frontend - `yarn start:frontend`

#### Build

- Open `./scripts/build.sh`
- Update `version` at Line 4 in `build.sh`
- Run `npm run build` to build compined version of both backend and frontend.
- Build will be created in the root named `${appName}-${version}`

#### Release

- Zip `${appName}-${version}` directory.
- Create a new release [here](https://github.com/thinkholic/backdrop-js/releases/new) for particular version. (Name it with the version)
- Upload `${appName}-${version}.zip` there
- Release

### FAQ

#### Error: Cannot find module '<path>/backdrop-js/node_modules/@backdropjs/jsondb/dist/index.js'. Please verify that the package.json has a valid "main" entry

```
cd packages/server-nodejs
yarn remove @backdropjs/jsondb
yarn add @backdropjs/jsondb
```

This will fix the problem for now.
