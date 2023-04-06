// 模版列表
const templateList = [
  {
    name: 'template-react（中后台项目模版-React）',
    group: 'app',
    gitName: 'financial-base-fe',
    branch: '',
  },
  {
    name: 'template-user（中后台项目模版-用户中心）',
    group: 'app',
    gitName: 'fe-app-center',
    branch: '',
  },
  {
    name: 'template-microHost（中后台项目模版-微应用基座）',
    group: 'app',
    gitName: 'fe-micro-host',
    branch: '',
  },
];

// 问题列表
const questions = [
  {
    name: 'template',
    type: 'list',
    choices: templateList,
    message: 'Select template：',
  },
  {
    name: 'cloneType',
    type: 'list',
    choices: ['HTTP', 'SSH'],
    message: 'Select Clone Type：',
  },
];

const questionAccount = [
  {
    name: 'username',
    type: 'input',
    message: 'Please Input the TD gitlab username：',
  },
  {
    name: 'password',
    type: 'password',
    message: 'Please Input the TD gitlab password：',
  },
];

module.exports = {
  templateList,
  questions,
  questionAccount,
};
