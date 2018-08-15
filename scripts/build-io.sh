cp -R entrypoints react
cp -R src react/components
mv react/components/locales/ react
cd react/components/
rm -rf __mocks__/ propTypes/ index.js *.test.js setupTests.js
mv rules/* ../
rm -rf rules/
cd ../../