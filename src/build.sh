rollup -c

# Go ahead and copy the files that will be published on npm to the npm directory.

cp -f ../dist/fo-markdown-note-bundle.js ../npm/fo-markdown-note-bundle.js
echo Copied fo-markdown-note-bundle.js to npm directory.
cp -f ../README.md ../npm/README.md
echo Copied README.md to npm directory.
