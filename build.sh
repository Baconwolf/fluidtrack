#! /bin/bash

# Build the project
npm run build

cp -R dist tmpdist

git checkout gh-pages

rm -rf assets

cp -R tmpdist/* .

rm -rf tmpdist

git add .
git commit -m "Update gh-pages"
git push origin gh-pages

git checkout master