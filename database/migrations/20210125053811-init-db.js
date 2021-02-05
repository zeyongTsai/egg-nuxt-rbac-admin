/*
 * @Author: caizeyong
 * @Date: 2021-01-25 13:38:11
 * @Description:
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BOOLEAN } = Sequelize;
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      account: {
        type: STRING(50),
        unique: true,
        allowNull: false
      },
      password: {
        type: STRING(64),
        allowNull: false
      },
      name: {
        type: STRING(30)
      },
      avatar: {
        type: STRING(200)
      },
      created_at: DATE,
      updated_at: DATE,
    });

    await queryInterface.createTable('roles', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: STRING(20),
        unique: true,
        comment: 'role name, used in program'
      },
      alias: {
        allowNull: false,
        type: STRING(20),
        unique: true,
        comment: 'role alias name, show it to administrator'
      },
      status: {
        type: BOOLEAN,
        comment: 'is role disabled'
      },
      remark: STRING(100),
      created_at: DATE,
      updated_at: DATE,
    })

    await queryInterface.createTable('permissions', {
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
      created_at: DATE,
      updated_at: DATE,
    })

    await queryInterface.createTable('user_role', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      role_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
      },
      created_at: DATE,
      updated_at: DATE,
    })
    await queryInterface.addIndex('user_role', {
      unique: true,
      fields: ['user_id','role_id']
    })

    await queryInterface.createTable('role_permission', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
      },
      permission_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'permissions',
          key: 'id'
        },
      },
      created_at: DATE,
      updated_at: DATE,
    })
    await queryInterface.addIndex('role_permission', {
      unique: true,
      fields: ['role_id', 'permission_id']
    })

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
