import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = () => ({
  username: '',
  isSignedIn: false,
  ranking: [],
})

export default new Vuex.Store({
  state: initialState(),
  actions: {
    setRanking ({ commit, rootState }, payload) {
      const clonedRankingState = rootState.ranking
      const rankIndex = clonedRankingState.findIndex(item => item.id === payload.id)

      if (rankIndex !== -1) {
        // 랭킹이 존재한다면 (즉, 해당 rankId로 랭킹이 지속적으로 측정되는 중이라면)
        clonedRankingState[rankIndex] = payload
      } else {
        clonedRankingState.push(payload)
      }

      const ranking = clonedRankingState.sort((a, b) => a.elapsed - b.elapsed)

      commit('setRanking', ranking)
    },
  },
  mutations: {
    setSignIn (state, payload) {
      state.username = payload
      state.isSignedIn = true
    },
    setSignOut (state) {
      state.username = initialState().username
      state.isSignedIn = false
    },
    setRanking (state, payload) {
      state.ranking = payload || initialState().ranking
    },
  },
})
