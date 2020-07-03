
export default class api {
    constructor(axios, store) {
        this._axios = axios;
        this._store = store;
    }

    setStaticFail(value) {
        this._staticFail = value;
    }

    setStaticError(value) {
        this._staticError = value;
    }

    _apiUrl(){
        return this._store.state.serverurl;
    }

    token() {
        return this._store.state.token;
    }

    os() {
        return this._store.state.os;
    }

    browser() {
        return this._store.state.browser;
    }
    get_bet_record() {
        return this.post('get_bet_record');
    }
    post(command, data = {}){
        let body = {
            'command': command,
            'data': data,
            'token': this.token()
        };
        if (this._store.state.showLog) {
            console.log(body);
            console.log(data);
        }
        return new Promise((resolve, reject) => {
            this._axios.post(this._apiUrl(), JSON.stringify(body), {timeout: 70000}).then(res => {
                if (this._store.state.showLog) {
                    console.log('$http post 成功 回傳如下');
                    console.log(res);
                }

                const resData = res;

                if (resData.error_code === 0) {
                    if (resData.data === null) {
                        resData.data = [];
                    }
                    resolve(resData.data);
                } else {
                    if (this._staticFail) {
                        this._staticFail(resData)
                    }
                    reject(resData.data);
                }
            }).catch(error => {
                if (this._store.state.showLog) {
                    console.log('$http post 失敗 回傳如下');
                    console.log('command = ' + command);
                    console.log(error);
                }
                if (this._staticError) {
                    this._staticError(error, command);
                }
            })
        });
    }




}
