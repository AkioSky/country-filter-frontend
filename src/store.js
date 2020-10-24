import Vue from 'vue';
import Vuex from 'vuex';
import CONSTANT from './constant';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'


Vue.use(Vuex);
Vue.use(VueLodash, { lodash: lodash });

export default new Vuex.Store({
    state: {
        countries: [],
        bannedCountries: []
    },
    mutations: {
        setCountryInfo(state, payload) {
            state.countries = payload;
        },
        setBannedCountries(state, payload) {
            state.bannedCountries = payload;
        }
    },
    actions: {
        getCountries({ commit }) {
            return new Promise((resolve, reject) => {
                Vue.prototype
                    .$http({
                        url: CONSTANT.SERVER_URL + '/api/country/',
                        method: 'GET'
                    })
                    .then(resp => {
                        const grouped = Vue._.mapValues(
                            Vue._.groupBy(resp.data, 'sub_category'),
                            clist => clist.map(country => Vue._.omit(country, 'sub_category'))
                        );
                        const banned = Vue._.filter(resp.data, v => v.banned);
                        commit('setCountryInfo', grouped);
                        commit('setBannedCountries', banned);
                        resolve(resp);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        saveCountries() {
            let result = Vue._.map(this.state.countries, function(value) {
                return Vue._.map(value, function (v) {
                    return { id: v.id, name: v.name, banned: v.banned };
                });
            });
            result = Vue._.spread(Vue._.union)(result);
            return new Promise((resolve, reject) => {
                Vue.prototype
                    .$http({
                        url: CONSTANT.SERVER_URL + '/api/country/bulk-ban/',
                        method: 'PATCH',
                        data: result
                    })
                    .then(resp => {
                        resolve(resp);
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        }
    }
})