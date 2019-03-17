'use strict';

const Service = require('egg').Service;
const utils = require("../lib/utils");

class HospitalService extends Service {
  async create(params) {
    let data = utils.objectCTUS(params);
    if (undefined != await this.app.mysql.get('hospital', { hospital_name: data.hospital_name })) {
      return { msg: '该医院已存在', status: 1 };
    }
    if (!(data.latitude && data.longitude)) {
      let res = await this.ctx.service.common.geocoder({ address: data.address, tag: 'forward' });
      if (res.status == 0) {
        data.latitude = res.result.location.lat;
        data.longitude = res.result.location.lng;
      } else {
        return { msg: '地址解析失败', status: 1 };
      }
    }
    const result = await this.app.mysql.insert('hospital', { ...data });
    if (result.affectedRows === 1) {
      return { msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 }
    }
  }

  async show(id) {
    let result = await this.app.mysql.get('hospital', { hospital_id: id });
    result = utils.objectUSTC(result);
    return { data: result, status: 0 };
  }

  async update(id, params) {
    let data = utils.objectCTUS(params);
    if (data.address && (!(data.latitude && data.longitude))) {
      let res = await this.ctx.service.common.geocoder({ address: data.address, tag: 'forward' });
      if (res.status == 0) {
        data.latitude = res.result.location.lat;
        data.longitude = res.result.location.lng;
      } else {
        return { msg: '地址解析失败', status: 1 };
      }
    }
    const result = await this.app.mysql.update('hospital', data, { where: { hospital_id: id } });
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('hospital', { hospital_id: id });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }

  async hospList(params) {
    const { address, keyword, p, page_size } = params;
    let sql = 'SELECT * FROM hospital';
    let array = [];

    if (address) {
      sql += ' WHERE address like ?';
      array.push('%' + address + '%');
    }
    if (keyword) {
      if (sql.search(/WHERE/) > -1) {
        sql += ' AND';
      } else {
        sql += ' WHERE';
      }
      sql += ' hospital_name like ?';
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

  async hospDelete(params) {
    const { ids } = params;
    const res = await this.app.mysql.select('hospital', { where: { hospital_id: ids.split(',') }, columns: 'hospital_logo' });
    for (let item of res) {
      await this.ctx.service.common.deleteFile(item.hospital_logo);
    }
    const result = await this.app.mysql.delete('hospital', { hospital_id: ids.split(',') });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 };
    }
  }
}

module.exports = HospitalService;