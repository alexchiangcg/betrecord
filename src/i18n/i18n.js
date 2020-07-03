import Vue from 'vue'
import VueI18n from 'vue-i18n';

const zh_cn = {...require('./default_zh_cn.json')};
const en = {...require('./default_en.json')};
const ko = {...require('./default_ko.json')};
const id = {...require('./default_id.json')};

//使用插件
Vue.use(VueI18n);

//這個從新整理還可以存著
const locale = sessionStorage.getItem('locale') || 'zh_cn';

// 建立 VueI18n 實體
const i18n = new VueI18n({
    locale,
    messages: {zh_cn, en,ko,id},
    silentFallbackWarn: true
});

export default i18n
