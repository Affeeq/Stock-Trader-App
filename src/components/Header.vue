<template>
	<div>
		<b-navbar toggleable="md" type="light" variant="light">
			<router-link to="/" active-class="active" exact><b-navbar-brand>Stock Trader</b-navbar-brand></router-link>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav v-if="auth">
					<b-nav-item to="/portfolio" router-tag="li" active-class="active">Portfolio</b-nav-item>
					<b-nav-item to="/stocks" tag="li" active-class="active">Stocks</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto" v-if="auth">
					<b-nav-item @click="endDay">End Day</b-nav-item>
					<b-nav-item-dropdown text="Save & Load" right>
						<b-dropdown-item @click="submit">Save Data</b-dropdown-item>
						<b-dropdown-item @click="fetch">Load Data</b-dropdown-item>
					</b-nav-item-dropdown>
					<b-nav-item disabled><strong>Funds: {{ funds }}</strong></b-nav-item>
					<b-nav-item @click="logout">Logout</b-nav-item>
				</b-navbar-nav>
				<b-navbar-nav class="ml-auto" v-if="!auth">
					<b-nav-item to="/signin" tag="li" active-class="active">Sign In</b-nav-item>
					<b-nav-item to="/signup" tag="li" active-class="active">Sign Up</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { mapGetters } from 'vuex';
	export default {
		methods: {
			...mapActions('stocks', [
				'endDay'
			]),
			...mapActions('data', [
				'submit',
				'fetch',
				'logout'
			])
		},
		computed: {
			...mapGetters({
				funds: 'custom/getFunds',
				portfolio: 'portfolio/getPortfolio',
				stocks: 'stocks/getStocks',
				auth: 'data/isAuthenticated'
			})
		}
	}
</script>

<style scoped>
	.nav-link {
		cursor: pointer;
	}

	.dropdown-menu {
		min-width: 7rem;
	}
</style>