'use strict';

const Service = require('egg').Service;
const utils = require("../lib/utils");

class DepartmentService extends Service {
  async create(params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.insert('department', { ...data });
    if (result.affectedRows === 1) {
      return { msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 }
    }
  }

  async show(id) {
    let result = await this.app.mysql.get('department', { department_id: id });
    result = utils.objectUSTC(result);
    return { data: result, status: 0 };
  }

  async update(id, params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.update('department', data, { where: { department_id: id } });
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('department', { department_id: id });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }

  async deptList(params) {
    const { keyword, p, page_size } = params;
    let sql = 'SELECT * FROM department';
    let array = [];

    if (keyword) {
      sql += ' WHERE department_name like ?';
      array.push('%' + keyword + '%');
    }
    if (p && page_size) {
      sql += ' LIMIT ?,?';
      array = array.concat([(p - 1) * page_size, p * page_size]);
    }

    const result = await this.app.mysql.query(sql, array);
    let temp = [];
    result.map(value => {
      temp.push(utils.objectUSTC(value));
    });
    return { data: temp, status: 0 };
  }

  async deptDelete(params) {
    const { ids } = params;
    const result = await this.app.mysql.delete('department', { department_id: ids.split(',') });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 };
    }
  }
}

module.exports = DepartmentService;