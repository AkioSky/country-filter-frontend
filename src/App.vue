<template>
    <v-app>
        <v-main>
            <BanCountry/>
        </v-main>
    </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import BanCountry from './components/BanCountry';

export default {
    name: 'App',

    components: {
        // HelloWorld,
        BanCountry
    },

    data: () => ({
        //
    }),
};
</script>
