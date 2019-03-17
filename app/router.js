'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 地址解析
  router.get('/common/geocoder', controller.common.geocoder);

  // 地址解析
  router.get('/common/login', controller.common.login);

  // 上传文件
  router.post('/common/upload', controller.common.upload);

  // 删除文件
  router.post('/common/delete_file', controller.common.deleteFile);

  // 医院
  router.resources('hospital', '/hospital', controller.hospital);
  router.get('/hosp_list', controller.hospital.hospList);
  router.post('/hosp_delete', controller.hospital.hospDelete);

  // 科室
  router.resources('department', '/department', controller.department);
  router.get('/dept_list', controller.department.deptList);
  router.post('/dept_delete', controller.department.deptDelete);

  // 医生
  router.resources('doctor', '/doctor', controller.doctor);
  router.get('/doctor_list', controller.doctor.doctorList);
  router.post('/doctor_delete', controller.doctor.doctorDelete);

  // 用户
  router.resources('user', '/user', controller.user);
  router.post('/user/set_userinfo', controller.user.setUserinfo);
  router.post('/user/get_userinfo', controller.user.getUserinfo);
  

  // 就诊人
  router.resources('patient', '/patient', controller.patient);
  router.get('/patient_list', controller.patient.patientList);
  router.post('/patient_delete', controller.patient.patientDelete);
};
