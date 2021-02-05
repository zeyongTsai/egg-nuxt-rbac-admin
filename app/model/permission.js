/*
 * @Author: caizeyong
 * @Date: 2021-01-20 15:55:10
 * @Description:
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const Permission = app.model.define('permission', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: STRING(80),
      unique: true,
      comment: 'permission name, used in program'
    },
    alias: {
      allowNull: false,
      type: STRING(80),
      comment: 'permission alias name, show it to administrator'
    },
    type: {
      type: INTEGER,
      comment: 'permission type, eg: menu in GUI and action code in program'
    },
    parent: {
      type: INTEGER,
      comment: 'maybe needed when type is menu'
    },
    sort: {
      type: INTEGER,
      comment: 'maybe needed when type is menu'
    },
    url: STRING(100),
    icon: STRING(200),
  }, {
    tableName: 'permissions'
  })

  Permission.associate = function () {
    app.model.Permission.hasMany(app.model.RolePermission, {
      foreignKey: 'permission_id'
    })
  }

  return Permission
}
