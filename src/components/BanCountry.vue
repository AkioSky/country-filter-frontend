<template>
    <v-card flat tile>
        <v-container>
            <v-row>
                <v-toolbar flat>
                    <v-toolbar-title>Banned Countries</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">Back</v-btn>
                </v-toolbar>
            </v-row>
            <v-row>
                <v-col cols="12">
                    Banned
                </v-col>
                <fragment
                        v-for="(sub_category, i) in this.$store.state.countries"
                        :key="i"
                >
                    <fragment
                            v-for="(country, j) in sub_category"
                            :key="j"
                    >
                        <v-chip
                                class="ma-2"
                                close
                                color="blue"
                                label
                                outlined
                                v-if="country.banned"
                                @click:close="country.banned = false"
                        >
                            {{country.name}}
                        </v-chip>
                    </fragment>
                </fragment>

            </v-row>
            <v-row>
                <v-col cols="12">Selected banned Countries</v-col>
                <v-col>
                    <v-checkbox
                            v-model="select_all"
                            label="Select All"
                    ></v-checkbox>
                </v-col>
            </v-row>
            <v-row>
                <v-tabs fixed-tabs v-model="tab">
                    <v-tab
                            v-for="(category, i) in categories"
                            :key="i"
                    >
                        {{ category }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item
                                v-for="(category, i) in categories"
                                :key="i"
                    >
                        <v-card flat>
                            <v-card-text v-if="category_item=getCategoryItem(category)">
                                <v-row
                                        v-for="(sub_category, i) in category_item"
                                        :key="i"
                                >
                                    <v-col cols="12">
                                        <v-card-title>{{i}}</v-card-title>
                                    </v-col>
                                    <v-col cols="3"
                                           v-for="(country, j) in sub_category"
                                           :key="j"
                                           style="padding: 0;"
                                    >
                                        <v-checkbox
                                                v-model="country.banned"
                                                :label="country.name"
                                        >
                                        </v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-row>
            <v-row>
                <v-toolbar flat>
                    <v-btn>Back</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveAction()">Save</v-btn>
                </v-toolbar>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import { Fragment } from 'vue-fragment';

    export default {
        components: { Fragment },
        name: "BanCountry",
        data: () => ({
            tab: null,
            select_all: false,
            categories: ["ABC", "DEF", "GHI", "JKL", "MN", "OPQ", "RST", "UVW", "XYZ"],
        }),
        methods: {
            getCategoryItem: function (category) {

                return Object.keys(this.$store.state.countries)
                    .filter(key => category.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = this.$store.state.countries[key];
                        return obj;
                    }, {});
            },
            saveAction: function () {
                this.$store
                    .dispatch('saveCountries');
            }
        },
        created() {
            this.$store
                .dispatch('getCountries')
                .then(() => {

                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
</script>

<style scoped>
    .v-tabs-items {
        width: 100%;
    }
</style>