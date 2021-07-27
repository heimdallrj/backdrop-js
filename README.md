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

#### Contributing

- As the project is in early satge, we keep numbers of project in same repository.
- Primary branch is `master`, and strongly recommend to avoid pushing changes to `master` branch directly.
- Always use feature branches.
- Alyways put active WIP PRs in draft stage

##### Branch names

- Use `feat/<awasome-feature>-[issue-id]` naming conventions for feature branches
- Use `fix/<good-fix>-[issue-id]` for bug fixes
- Use `chore/<task>-[issue-id]` for regular tasks

##### PR naming

- Use `feat: <My Awesome Feature>` naming conventions for feature titles
- Use `fix: <That fix>` for fixes
- Use `chore: <Regular Task>` for regular tasks

##### Commit messages

- Follow these guidelines
  - [How to Write a Git Commit Message by Chris Beams](https://chris.beams.io/posts/git-commit/)
  - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

##### Issues

Apply labels appropriately for each issues when created:

- `epic`
- `bug`
- `feature`
- `feature-request`
- `enhancement`
- `documentation`
- `question`
- `help wanted`

Components:

- `comp:cli`
- `comp:frontend`
- `comp:node-jsondb`
- `comp:server`

Labels for maintainers

- `wontfix`
- `invalid`
- `good first issue`
- `duplicate`

### FAQ

#### Error: Cannot find module '<path>/backdrop-js/node_modules/@backdropjs/jsondb/dist/index.js'. Please verify that the package.json has a valid "main" entry

```
cd packages/server-nodejs
yarn remove @backdropjs/jsondb
yarn add @backdropjs/jsondb
```

This will fix the problem for now.
