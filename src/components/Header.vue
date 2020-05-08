<template>
	<div>
		<nav class="navbar navbar-expand-sm navbar-light bg-light">
			<router-link to="/" active-class="active" exact><a class="navbar-brand">Stock Trader</a></router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto" v-if="auth">
					<router-link to="/portfolio" tag="li" active-class="active"><a class="nav-link">Portfolio</a></router-link>
					<router-link to="/stocks" tag="li" active-class="active"><a class="nav-link">Stocks</a></router-link>
				</ul>
				<ul class="navbar-nav ml-auto" v-if="auth">
					<li class="nav-item"><a class="nav-link" @click="endDay">End Day</a></li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Save & Load
						</a>
						<div class="dropdown-menu text-center" aria-labelledby="navbarDropdown">
							<li class="nav-item"><a class="nav-link" @click="submit">Save Data</a></li>
							<li class="nav-item"><a class="nav-link" @click="fetch">Load Data</a></li>
						</div>
					</li>
					<li class="nav-item"><a class="nav-link disabled" href="#"><strong>Funds: {{ funds }}</strong></a></li>
					<li class="nav-item"><a class="nav-link" @click="logout">Logout</a></li>
				</ul>
				<ul class="navbar-nav ml-auto" v-if="!auth">
					<router-link to="/signin" tag="li" active-class="active"><a class="nav-link">Sign In</a></router-link>
					<router-link to="/signup" tag="li" active-class="active"><a class="nav-link">Sign Up</a></router-link>
				</ul>
			</div>
		</nav>
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