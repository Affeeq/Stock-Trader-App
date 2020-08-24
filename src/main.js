import Vue from 'vue';
import BootstrapVue from "bootstrap-vue";
import App from './App.vue';
import router from './routes';
import { store } from './store/store.js';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue);

// root vue instance
new Vue({
	el: '#app',
	router,
	store,
	created() {
    	this.$store.dispatch('stocks/createdRandomNum');
	},
	render: h => h(App)
})
