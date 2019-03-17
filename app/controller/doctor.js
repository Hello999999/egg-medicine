'use strict';

const Controller = require('egg').Controller;

class DoctorController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.doctor.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.doctor.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.doctor.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.doctor.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async doctorList() {
    const ctx = this.ctx;
    const result = await ctx.service.doctor.doctorList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async doctorDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.doctor.doctorDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = DoctorController;
