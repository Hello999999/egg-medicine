'use strict';

const Controller = require('egg').Controller;

class DepartmentController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.department.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.department.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.department.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.department.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async deptList() {
    const ctx = this.ctx;
    const result = await ctx.service.department.deptList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async deptDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.department.deptDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = DepartmentController;
