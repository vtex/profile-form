rm -rf react
cp -R entrypoints react
cp package.json react
cp -R src react/components
mv react/components/locales/ react
cd react/components/
rm -rf __mocks__/ index.js *.test.js setupTests.js
cd ../../