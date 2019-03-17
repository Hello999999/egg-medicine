'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async find(uid) {
    const data = 'hello world!';
    return data;
  }
}

module.exports = HomeService;