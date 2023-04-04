// 模版列表
const templateList = [
  {
    name: 'template-user(用户中心项目模版)',
    group: 'app',
    gitName: 'fe-app-center',
  },
  {
    name: 'template-user(用户中心项目模版2)',
    group: 'app2',
    gitName: 'fe-app-center2',
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
