'use strict';

const Controller = require('egg').Controller;

class CommonController extends Controller {
  async geocoder() {
    const { ctx } = this;
    const result = await ctx.service.common.geocoder(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }
  
  async login() {
    const { ctx } = this;
    const result = await ctx.service.common.login(ctx.request.query.code);
    ctx.body = result;
    ctx.status = 200;
  }

  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const result = await ctx.service.common.upload(stream);
    ctx.body = result;
    ctx.status = 200;
  }

  async deleteFile() {
    const { ctx } = this;
    const result = await ctx.service.common.deleteFile(ctx.request.body.url);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = CommonController;
