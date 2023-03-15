const path = require('path');
const util = require('util');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const downloadGitRepo = require('download-git-repo'); // 不支持 Promise
const spawn = require('cross-spawn');

const { getRepoList, getDownloadUrl } = require('./service');

// 添加加载动画
async function requestHolder(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(`\r\n${message}`);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...');
  }
}

class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;

    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 获取用户选择的模板
  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await requestHolder(
      getRepoList,
      'Waiting fetch template list...'
    );
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList
      .map((item) => item.name)
      .filter((k) => k.includes('lighter'));

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Select template：',
    });

    // 3）return 用户选择的名称
    return repo;
  }
  // 下载
  async download(repo) {
    // 1）拼接下载地址
    const requestUrl = getDownloadUrl(repo);

    // 2）调用下载方法
    await requestHolder(
      this.downloadGitRepo, // 远程下载方法
      'Waiting download template...', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)
    ); // 参数2: 创建位置

    console.log(`\r\nProject ${chalk.cyan(this.name)} created successfully!`);
  }
  // 安装依赖
  async launch() {
    const cwd = path.join(process.cwd(), this.name);
    const args = ['i'];
    const options = { cwd, stdio: 'inherit' };

    console.log(`\r\nInstalling the dependency...`);
    spawn.sync('npm', args, options);

    console.log(`\r\nThe project isStarting...`);
    spawn.sync('npm', ['run', 'dev'], options);
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）下载模板到模板目录
  // 3) 本地启动
  async create() {
    // 1）获取模板名称
    const repo = await this.getRepo();

    // 2）下载模板到模板目录
    await this.download(repo);

    // 3）模板使用提示

    await this.launch();
  }
}

module.exports = Generator;
