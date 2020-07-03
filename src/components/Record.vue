<template>
    <div class="record-wrap">
        <div class="account-wrap">
            <p>{{$t('account')+' : '+account}}</p>
        </div>

        <div class="table-wrap">
            <b-table striped
                     hover
                     :items="items"
                     :fields="fields">
                <template v-slot:cell(game_id)="data">
                    {{ parseGameName(data.item.game_id) }}
                </template>
                <template v-slot:cell(change_credit)="data">
                    <div :class="{'text-red' : data.item.change_credit < 0}">
                        {{data.item.change_credit}}
                    </div>
                </template>
                <template v-slot:cell(detail)="data">
                    <b-button @click="selectedData = data.item, isShowDetail = true">
                        {{$t('detail')}}
                    </b-button>
                </template>
            </b-table>
        </div>

        <b-modal v-if="selectedData"
                 v-model="isShowDetail"
                 hide-backdrop
                 ok-only
                 content-class="shadow"
                 header-class="modal-title"
                 :title="parseGameName(selectedData.game_id)">
            <p class="my-2">
                {{selectedData.game_id}}
            </p>
        </b-modal>
    </div>
</template>

<script>
    import i18n from '../i18n/i18n'
    import {parseGameName} from '../tool/parseTool'

    export default {
        name: "Record",
        data() {
            return {
                account: 'test01',
                fields: [
                    {key: 'date', label: i18n.t('date')},
                    {key: 'order_id', label: i18n.t('order_id')},
                    {key: 'game_id', label: i18n.t('game_name')},
                    {key: 'order_credit', label: i18n.t('order_credit')},
                    {key: 'payout_credit', label: i18n.t('payout_credit')},
                    {key: 'change_credit', label: i18n.t('change_credit')},
                    {key: 'detail', label: i18n.t('detail')},
                ],
                items: [],
                bet_record: [
                    {
                        order_id: 123456,          //number, order id
                        account: "account",         //string, 用戶帳號
                        game_id: 1601,                    //number, game id
                        order_credit: 123456,                //number, 投注額
                        payout_credit: 123456,               //number, 派彩  (含jackpot )
                        date: "2020:0606 13:00:00",      //string, 投注時間
                        bet_line: 123456,                      //num, 每線注額
                        line_number: 1,                          //num, 有幾條線
                        coin_value: 123,                 // 幣倍率
                        user_credit: 123,                 //num, 用戶結算後金額
                        change_credit: 123,              //num, 變動金額(輸贏金額) (含jackpot)
                        result: "",                              //json, 詳細結果
                    }, {
                        order_id: 123456,          //number, order id
                        account: "account",         //string, 用戶帳號
                        game_id: 1602,                    //number, game id
                        order_credit: 123456,                //number, 投注額
                        payout_credit: 123456,               //number, 派彩  (含jackpot )
                        date: "2020:0606 13:00:00",      //string, 投注時間
                        bet_line: 123456,                      //num, 每線注額
                        line_number: 1,                          //num, 有幾條線
                        coin_value: 123,                 // 幣倍率
                        user_credit: 123,                 //num, 用戶結算後金額
                        change_credit: 123,              //num, 變動金額(輸贏金額) (含jackpot)
                        result: "",                              //json, 詳細結果
                    }, {
                        order_id: 123456,          //number, order id
                        account: "account",         //string, 用戶帳號
                        game_id: 1603,                    //number, game id
                        order_credit: 123456,                //number, 投注額
                        payout_credit: 123456,               //number, 派彩  (含jackpot )
                        date: "2020:0606 13:00:00",      //string, 投注時間
                        bet_line: 123456,                      //num, 每線注額
                        line_number: 1,                          //num, 有幾條線
                        coin_value: 123,                 // 幣倍率
                        user_credit: 123,                 //num, 用戶結算後金額
                        change_credit: -111,              //num, 變動金額(輸贏金額) (含jackpot)
                        result: "",                              //json, 詳細結果
                    }],
                isShowDetail: false,
                selectedData: undefined,
            }
        },
        mounted() {
            this.get_bet_record();
        },
        methods: {
            get_bet_record() {
                this.items = this.bet_record;
                this.$apiService.get_bet_record()
                    .then((res) => {
                        this.account = res[0].account;
                        this.bet_record = res;
                    })
            },
            parseGameName(gameID) {
                return parseGameName(gameID);
            },
        }
    }
</script>

<style scoped
       lang="scss">
    .record-wrap {
        .account-wrap {
            text-align: left;
            padding: 20px;
            font-size: 18px;
        }

        .text-red {
            color: red;
        }
    }
</style>
