import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPcMode: true,
    showLog: true,

    os: '',
    browser: '',
    token: '',
    lang:'',
    serverurl:''

  },
  mutations: {
    updateIsPcMode(state, isPcMode) {
      state.isPcMode = isPcMode;
      sessionStorage.setItem('isPcMode', isPcMode);
    },
    setOs(state, os) {
      state.os = os.toString();
    },
    setBrowser(state, browser) {
      state.browser = browser;
    },
    setToken(state, token) {
      state.token = token;
    },
    setLang(state, lang) {
      state.lang = lang;
    },
    setServerurl(state, serverurl) {
      state.serverurl = serverurl;
    },

  },
  actions: {

  }
})
