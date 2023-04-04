const path = require('path');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');

const { questions, questionAccount, templateList } = require('./config');

class Generator {
  constructor(name) {
    // 目录名称
    this.name = name;
  }

  async getTemplateUrl() {
    const { template, cloneType, username, password } = await inquirer.prompt(
      questions
    );
    const { group, gitName } =
      templateList.filter((k) => k.name === template)[0] || {};
    let gitUrl;

    if (cloneType === 'HTTP') {
      const { username, password } = await inquirer.prompt(questionAccount);
      if (!username || !password) {
        console.error('Error: 请输入Gitlab账号或密码');
        return;
      }

      gitUrl = `https://${username.replace(/@/g, '%40')}:${password.replace(
        /@/g,
        '%40'
      )}@gitlab.tongdun.cn/${group}/${gitName}.git`;
    } else {
      gitUrl = `git@gitlab.tongdun.cn:${group}/${gitName}.git`;
    }

    return gitUrl;
  }

  // 核心创建逻辑
  async create() {
    const cwd = path.join(process.cwd(), this.name);
    const options = { cwd, stdio: 'inherit' };
    const templateUrl = await this.getTemplateUrl();

    if (!templateUrl) {
      return;
    }

    console.info(`\r\nDownloading the project template...`);
    spawn.sync('git', ['clone', templateUrl, this.name], { stdio: 'inherit' });

    console.info(`\r\nInstalling the dependency...`);
    spawn.sync('npm', ['i'], options);

    console.info(`\r\nThe project is starting...`);
    spawn.sync('npm', ['run', 'dev'], options);
  }
}

module.exports = Generator;
