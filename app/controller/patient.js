'use strict';

const Controller = require('egg').Controller;

class PatientController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async patientList() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.patientList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async patientDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.patientDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = PatientController;
