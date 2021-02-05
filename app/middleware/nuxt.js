/*
 * @Author: caizeyong
 * @Date: 2021-01-15 14:43:37
 * @Description: nuxt
 */
const nuxtConfig = require('../../nuxt.config.js')
const { Nuxt, Builder } = require('nuxt')

module.exports = (options, app) => {
  const isProd = app.config.env === 'prod'
  const nuxtInstance = new Nuxt(Object.assign({}, nuxtConfig, {
    dev: !isProd,
    privateRuntimeConfig: {
      egg: app
    }
  }))
  if (!isProd) {
    const builder = new Builder(nuxtInstance)
    builder.build()
  }
  return async function nuxt(ctx, next) {
    const path = ctx.path;
    if (/\.js$/.test(path)) {
      ctx.set('Content-Type', 'application/javascript');
    }
    if (/\.css/.test(path)) {
      ctx.set('Content-Type', 'text/css');
    }
    // webpack hot reload
    // egg will set 'content-length' with value, it will disable the hot middleware keep alive.
    // egg 默认设置了 'content-length' 值，导致热更新失败，建议去掉该值保持活跃
    if (ctx.path === '/__webpack_hmr/client') {
      ctx.response.remove('Content-Length')
    }
    await new Promise((resolve) => {
      ctx.response.res.statusCode = 200
      ctx.request.req.eggContext = ctx
      nuxtInstance.render(ctx.request.req, ctx.response.res, resolve)
    })
    await next()
  }
}
