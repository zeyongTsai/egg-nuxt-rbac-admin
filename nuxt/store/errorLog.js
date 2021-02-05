/*
 * @Author: caizeyong
 * @Date: 2021-01-19 16:30:38
 * @Description:
 */
const state = () => ({
  logs: []
})

const mutations = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  },
  CLEAR_ERROR_LOG: (state) => {
    state.logs.splice(0)
  }
}

const actions = {
  addErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  },
  clearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
