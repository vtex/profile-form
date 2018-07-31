module.exports = {
  type: 'react-component',
  babel: {
    plugins: ['add-react-displayname'],
  },
  testFiles: ['**/__mock__/**', '*.spec.js', '*.test.js', '*-test.js'],
  npm: {
    esModules: false,
  },
}
