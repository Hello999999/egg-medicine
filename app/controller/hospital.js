'use strict';

const Controller = require('egg').Controller;

class HospitalController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.hospital.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.hospital.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.hospital.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.hospital.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async hospList() {
    const ctx = this.ctx;
    const result = await ctx.service.hospital.hospList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async hospDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.hospital.hospDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = HospitalController;
