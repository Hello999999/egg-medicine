"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.user.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.user.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.user.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.user.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async userList() {
    const ctx = this.ctx;
    const result = await ctx.service.user.userList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async userDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.user.userDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
  
  async setUserinfo() {
    const ctx = this.ctx;
    const result = await ctx.service.user.setUserinfo(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async getUserinfo() {
    const ctx = this.ctx;
    const result = await ctx.service.user.getUserinfo(ctx.request.body.token);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = UserController;
