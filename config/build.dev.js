const execSync = require('child_process').execSync;

const exec = (command, extraEnv) => {
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });
};

console.log('Building CommonJS modules ...');

exec('babel lib -d demo/node_modules/react-echarts-binding --ignore test.js', {
  BABEL_ENV: 'cjs',
  NODE_ENV: 'development',
});
