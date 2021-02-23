# About egg-nuxt-rbac-admin

this project is an RBAC admin based on [egg](https://github.com/eggjs/egg) 、[sequelize](https://github.com/sequelize/sequelize)、[nuxt](https://github.com/nuxt/nuxt.js)、[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 

# Getting start

```bash
# clone the project
git clone git@github.com:zeyongTsai/egg-nuxt-rbac-admin.git

# install all dependencies
yarn install

# config your database
vi ./database/config.json
vi ./config/config.default.json

# init database table structure
npx sequelize-cli db:migrate

# insert default data
npx sequelize-cli db:seed:all

# start dev server
yarn serve

# start prod server
yarn nuxt-build # build nuxt app
yarn start

```

# Project structure

| file or directory | explanation |
| - | - |
| app | api resources of egg.js framework |
| config | egg.js configuration |
| database | sequelize db configuration and migrate and seeder  |
| nuxt | nuxt.js resources |
| .sequelizerc | sequelize-cli configuration  |
| app.js | egg.js starter |
| nuxt.config.js | nuxt configuration |

# License

[MIT](LICENSE)
