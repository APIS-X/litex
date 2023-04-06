const ora = require('ora');
const chalk = require('chalk');

// 添加加载动画
async function requestHolder(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(`\r\n${message}`);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态修改为失败
    spinner.fail('Request failed, refetch ...');
  }
}

function consoleRewrite() {
  const logMaps = {
    log: {
      fn: console.log,
      color: 'cyan',
    },
    info: {
      fn: console.info,
      color: 'green',
    },
    error: {
      fn: console.error,
      color: 'red',
    },
  };
  const createLogs = function (key) {
    const { fn, color } = logMaps[key];
    return function () {
      fn('\n', chalk[color](...arguments));
    };
  };

  console.log = createLogs('log');
  console.info = createLogs('info');
  console.error = createLogs('error');
}

module.exports = {
  requestHolder,
  consoleRewrite,
};
