/*
 * @Author: caizeyong
 * @Date: 2021-02-05 14:06:36
 * @Description:
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
require.context('./svg', false, /\.svg$/)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// register globally
Vue.component('svg-icon', SvgIcon)
