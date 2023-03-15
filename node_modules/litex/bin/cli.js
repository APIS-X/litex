#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

const create = require('../lib/create');

program
  // 监听 --help 执行
  .on('--help', () => {
    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(
        `litex <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });

// 配置创建命令
program
  // 定义命令和参数
  .command('create <app-name>')
  .description('Create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'Overwrite target directory if it exist')
  .action((name, options) => {
    // 创建逻辑
    create(name, options);
  });

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]');

// 解析用户执行命令传入参数
program.parse(process.argv);
