/*
 * @Author: caizeyong
 * @Date: 2021-01-15 13:26:55
 * @Description: egg 配置
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606700154247_1409';

  config.passwordSalt = '8jFLF53mvw3ulWNwAtdt'

  config.middleware = ['nuxt']
  config.nuxt = {
    ignore: '/api'
  }
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'database_development',
    username: 'root',
    password: '123456'
  }
  config.auths = {}
  return {
    ...config
  };
}
