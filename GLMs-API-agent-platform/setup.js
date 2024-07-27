const fs = require('fs');
const path = require('path');

const projectStructure = [
  'public/index.html',
  'src/components/.gitkeep',
  'src/services/.gitkeep',
  'src/types/.gitkeep',
  'src/utils/.gitkeep',
  'src/App.tsx',
  'src/index.tsx',
  '.gitignore',
  'package.json',
  'tsconfig.json',
  'webpack.config.js',
];

const content = {
  'public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Intelligent Agent Workflow</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  'src/App.tsx': `import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      <h1>Intelligent Agent Workflow</h1>
    </div>
  );
};

export default App;`,
  'src/index.tsx': `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));`,
  '.gitignore': `node_modules
dist`,
  'package.json': `{
  "name": "intelligent-agent-workflow",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "typescript": "^4.3.5",
    "@types/react": "^17.0.14",
    "@types/react-dom": "^17.0.9",
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2",
    "html-webpack-plugin": "^5.3.2",
    "ts-loader": "^9.2.3"
  },
  "author": "",
  "license": "ISC"
}`,
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}`,
  'webpack.config.js': `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};`,
};

function createProjectStructure() {
  projectStructure.forEach(filePath => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (content[filePath]) {
      fs.writeFileSync(filePath, content[filePath]);
    } else {
      fs.writeFileSync(filePath, '');
    }
  });
}

createProjectStructure();
console.log('Project structure generated successfully.');
