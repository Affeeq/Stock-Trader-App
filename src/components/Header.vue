<template>
	<div>
		<nav class="navbar navbar-expand-sm navbar-light bg-light">
			<router-link to="/" active-class="active" exact><a class="navbar-brand">Stock Trader</a></router-link>
			<ul class="navbar-nav mr-auto">
				<router-link to="/portfolio" tag="li" active-class="active"><a class="nav-link">Portfolio</a></router-link>
				<router-link to="/stocks" tag="li" active-class="active"><a class="nav-link">Stocks</a></router-link>
			</ul>
			<ul class="navbar-nav ml-auto">
				<li class="nav-item"><button class="nav-link button" @click="randomNum">End Day</button></li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Save & Load
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<li class="nav-item"><button class="nav-link button data" @click="submit">Save Data</button></li>
						<li class="nav-item"><button class="nav-link button data" @click="getData">Load Data</button></li>
					</div>
				</li>
				<li class="nav-item"><a class="nav-link disabled" href="#"><strong>Funds: {{ funds }}</strong></a></li>
			</ul>
		</nav>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		data() {
			return {
				node: 'data',
				stocks: this.$store.state.stocks,
				portfolio: this.$store.state.portfolio
			};
		},
		methods: {
			...mapActions([
				'randomNum',
				'fetch',
				'clear'
			]),
			submit() {
    			this.$http.put('{node}.json', { portfolio: this.portfolio, stocks: this.stocks, funds: this.funds })
    				.then(response => {
    					return {messages: response.body};
    				}, error => {
    					console.log(error);
    				});
			},
			getData() {
				this.$http.get('{node}.json')
    			.then(response => {
    				return response.json();
    			})
    			.then(data => {
    				this.fetch(data.messages);
    			});
			}
		},
		computed: {
			funds() {
				return this.$store.getters.getFunds;
			}
		}
	}
</script>

<style>
	.button {
		border: none;
		background: none;
		outline: none;
	}

	.data {
		margin: 0 auto;
	}

	.dropdown-menu {
		min-width: 7rem;
	}
</style>