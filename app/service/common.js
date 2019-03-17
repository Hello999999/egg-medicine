"use strict";

const Service = require("egg").Service;
const crypto = require("crypto");
const fs = require("fs");
const path = require('path');
const pump = require('mz-modules/pump');
const url = require("url");

class CommonService extends Service {
  async geocoder(params) {
    let data = "";
    if (params.tag == 'forward') {
      // 地址转经纬度
      data = {
        address: params.address,
        output: "json",
        ak: this.config.ak
      }
    } else if (params.tag == 'reverse') {
      // 经纬度转地址
      data = {
        location: params.location,
        coordtype: params.coordtype,
        ak: this.config.ak,
        output: 'json'
      }
    }
    const result = await this.app.curl(
      "http://api.map.baidu.com/geocoder/v2/",
      {
        data
      }
    );
    if (result.status === 200) {
      return JSON.parse(result.data);
    }
  }

  async login(code) {
    const result = await this.app.curl(
      "https://api.weixin.qq.com/sns/jscode2session",
      {
        data: {
          appid: this.config.appId,
          secret: this.config.appSecret,
          js_code: code,
          grant_type: "authorization_code"
        }
      }
    );
    if (result.status === 200) {
      let data = JSON.parse(result.data);
      if (data.openid) {
        let md5 = crypto.createHash("md5");
        let token = md5.update(data.session_key + this.config.appSecret).digest("hex");
        const isExists = await this.app.mysql.get("wx_token", { open_id: data.openid });
        let res = "";
        if (typeof isExists === 'object') {
          res = await this.app.mysql.update("wx_token", { union_id: data.unionid || "", token, session_key: data.session_key, last_visit_time: this.app.mysql.literals.now }, { where: { open_id: data.openid } });
        } else {
          res = await this.app.mysql.insert("wx_token", { open_id: data.opegnid, union_id: data.unionid || "", token, session_key: data.session_key });
        }
        if (res.affectedRows === 1) {
          return {
            token,
            msg: "success"
          };
        }
      } else {
        return {
          ...data,
          msg: "fail"
        }
      }
    }
  }

  async upload(stream) {
    const ctx = this.ctx;
    const suffix = stream.filename.match(/\.[^\.]+$/g)[0];
    const filename = Date.now() + suffix;
    const target = path.join(this.config.baseDir, 'app/public/upload', filename);
    const webTarget = url.format({
      protocol: ctx.protocol,
      host: ctx.host,
      pathname: 'public/upload/' + filename
    });
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    return { data: { url: webTarget }, msg: '上传成功', status: 0 };
  }

  async deleteFile(param) {
    const obj = url.parse(param);
    const target = path.join(this.config.baseDir, 'app', obj.pathname);
    try {
      fs.unlinkSync(target);
      return { msg: '删除成功', status: 0 };
    } catch(err) {
      return { msg: '删除失败', status: 1 };
    }
  }
}

module.exports = CommonService;
