#!/bin/bash

appName=backdrop
version=v1.0.0-alpha.1
buildDir="$appName"-"$version"

rm -rf "$buildDir"
mkdir "$buildDir"

# server
serverDir=packages/server-nodejs
declare -a dirs=('src');
declare -a files=('.babelrc' '.env.example' '.eslintignore' '.eslintrc.js' '.gitignore' '.prettierignore' '.prettierrc.js' 'package.json', 'README.md');

for dir in "${dirs[@]}"
do
  mkdir "$buildDir"/"$dir"
  cp -r "$serverDir"/"$dir"/* "$buildDir"/src/
done

for file in "${files[@]}"
do
  cp -r "$serverDir"/"$file" "$buildDir"/
done

mv "$buildDir"/".env.example" "$buildDir"/.env

# frontend
frontendBuildDir=packages/frontend/build
adminDir="$buildDir"/src/public

cp -rf "$frontendBuildDir"/* "$adminDir"/

# release
# TODO Fix this
# zip -r "$buildDir".zip "$buildDir"/ "$buildDir"/.babelrc "$buildDir"/.env "$buildDir"/package.json
