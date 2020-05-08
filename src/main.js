import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import { store } from './store/store.js';

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
