// 通过 axios 处理请求
const axios = require('axios');
const { userGit } = require('./config');

axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  return axios.get(`https://api.github.com/users/${userGit}/repos`);
}

/**
 * 下载地址拼接
 * @param {*} repo
 * @param {*} tag
 * @returns
 */
function getDownloadUrl(repo) {
  return `${userGit}/${repo}`;
}

module.exports = {
  getRepoList,
  getDownloadUrl,
};
