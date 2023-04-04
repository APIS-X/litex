#! /usr/bin/env node

const commander = require('commander');

const init = require('../lib/init');
const { consoleRewrite } = require('../lib/utils');

consoleRewrite();

commander
  // 监听 --help 执行
  .on('--help', () => {
    // 新增说明信息
    console.log(
      `\r\nRun litex <command> --help for detailed usage of given command\r\n`
    );
  });

// 配置创建命令
commander
  // 定义命令和参数
  .command('init <app-name>')
  .description('init a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'Overwrite target directory if it exist')
  .action((name, options) => {
    // 创建逻辑
    init(name, options);
  });

commander
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]');

// 解析用户执行命令传入参数
commander.parse(process.argv);
