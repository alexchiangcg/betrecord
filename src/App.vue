<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    import i18n from "./i18n/i18n";

    export default {
        name: 'app',
        components: {},
        beforeCreate() {
            i18n.locale = sessionStorage.getItem('locale') || 'zh_cn';
        },
        created() {
            this.getToken();
            this.getLang();
            this.getServerurl();
            this.initApiService();
        },
        mounted() {
            this.getUserDevice();
        },
        methods: {
            initApiService() {
                this.$apiService.setStaticFail((resData) => {
                    if (this._store.state.showLog) {
                        console.log(resData);
                    }
                });
            },

            // 獲取 os browser
            getUserDevice() {
                const navUserAgent = navigator.userAgent;

                let os = 0;
                let browserVersion = null;
                let browser = null;

                // 判斷系統是Android IOS PC
                //0=unknown、1=PC、2=mobile、3=android、4=ios
                if (navUserAgent.match(/android/i)) {
                    os = 'android';
                    this.setPcmode(false);
                } else if (navUserAgent.match(/(iphone|ipad|ipod);?/i)) {
                    os = 'ios';
                    this.setPcmode(false);
                } else if (navUserAgent.match(/(windows mobile|windows ce|midp|rv:1.2.3.4|ucweb);?/i)) {
                    os = 'h5';
                    this.setPcmode(false);
                } else {
                    os = 'PC';
                    this.setPcmode(true);
                }

                // 判斷瀏覽器
                let navUALowerCase = navUserAgent.toLocaleLowerCase();

                if (navUALowerCase.match(/msie/) != null || navUALowerCase.match(/trident/) != null) {
                    browserVersion = navUALowerCase.match(/msie ([\d.] )/) != null ? navUALowerCase.match(/msie ([\d.] )/)[1] : navUALowerCase.match(/rv:([\d.] )/)[1];
                    browser = "IE" + browserVersion;
                } else if (navUALowerCase.match(/firefox/) != null) {
                    browser = "火狐";
                } else if (navUALowerCase.match(/ubrowser/) != null) {
                    browser = "UC";
                } else if (navUALowerCase.match(/opera/) != null) {
                    browser = "Opera";
                } else if (navUALowerCase.match(/bidubrowser/) != null) {
                    browser = "百度";
                } else if (navUALowerCase.match(/metasr/) != null) {
                    browser = "搜狗";
                } else if (navUALowerCase.match(/tencenttraveler/) != null || navUALowerCase.match(/qqbrowse/) != null) {
                    browser = "QQ";
                } else if (navUALowerCase.match(/maxthon/) != null) {
                    browser = "遨遊";
                } else if (navUALowerCase.match(/chrome/) != null) {
                    const mime = function (option, value) {

                        let mimeTypes = navigator.mimeTypes;

                        for (let mt in mimeTypes) {
                            if (mimeTypes[mt][option] === value) {
                                return true;
                            }
                        }
                        return false;
                    };

                    let is360 = mime("type", "application/vnd.chromium.remoting-viewer");

                    if (is360) {
                        browser = '360';
                    } else {
                        browser = 'chrome';
                    }
                } else if (navUALowerCase.match(/safari/) != null) {
                    browser = "Safari";
                }

                this.$store.commit('setOs', os);
                this.$store.commit('setBrowser', browser);
            },
            setPcmode(isPcMode) {
                this.$store.commit('updateIsPcMode', isPcMode);
            },
            getToken() {
                const url = new URL(window.location);
                //const url = new URL("https://xxxx/?token=tokenxxxx&lang=cn&serverurl=https://xxxxxserverurl");
                const params = url.searchParams;

                /// 優先拿網址的 token
                if (params.has('token')) {
                    this.$store.commit('setToken', params.get('token'));
                    localStorage.setItem('token', params.get('token'));
                } else {
                    let localStorageToken = localStorage.getItem('token');
                    if (localStorageToken !== null || localStorageToken !== 'null') {
                        this.$store.commit('setToken', localStorageToken);
                    }
                }
            },
            getLang() {
                const url = new URL(window.location);
                //const url = new URL("https://xxxx/?token=tokenxxxx&lang=zh-cn&serverurl=https://xxxxxserverurl");
                const params = url.searchParams;

                /// 優先拿網址的 token
                if (params.has('lang')) {
                    let lang = params.get('lang');
                    if (lang === 'zh-cn') {
                        lang = 'zh_cn'
                    }
                    this.$store.commit('setLang', lang);
                    localStorage.setItem('lang', lang);
                } else {
                    let localStorageLang = localStorage.getItem('lang');
                    if (localStorageLang !== null || localStorageLang !== 'null') {
                        this.$store.commit('setLang', localStorageLang);
                    }
                }
            },
            getServerurl() {
                const url = new URL(window.location);
                //const url = new URL("https://xxxx/?token=tokenxxxx&lang=cn&serverurl=https://xxxxxserverurl");
                const params = url.searchParams;


                /// 優先拿網址的 token
                if (params.has('serverurl')) {
                    this.$store.commit('setServerurl', params.get('serverurl'));
                    localStorage.setItem('serverurl', params.get('serverurl'));
                } else {
                    let localStorageServerurl = localStorage.getItem('serverurl');
                    if (localStorageServerurl !== null || localStorageServerurl !== 'null') {
                        this.$store.commit('setServerurl', localStorageServerurl);
                    }
                }
            },
        }
    }

</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .modal-title, .modal-header {
        color: red;
        font-size: 50px;
    }
</style>
