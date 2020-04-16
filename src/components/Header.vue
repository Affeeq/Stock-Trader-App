<template>
	<div>
		<nav class="navbar navbar-expand-sm navbar-light bg-light">
			<router-link to="/" active-class="active" exact><a class="navbar-brand">Stock Trader</a></router-link>
			<ul class="navbar-nav mr-auto">
				<router-link to="/portfolio" tag="li" active-class="active"><a class="nav-link">Portfolio</a></router-link>
				<router-link to="/stocks" tag="li" active-class="active"><a class="nav-link">Stocks</a></router-link>
			</ul>
			<ul class="navbar-nav ml-auto">
				<router-link to="" tag="li"><a class="nav-link" href="#" @click="randomNum">End Day</a></router-link>
				<li class="nav-item">
					<a class="nav-link dropdown-toggle" href="#">
						Save & Load
					</a>
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
				funds: this.$store.state.funds
			}
		},
		methods: {
			...mapActions([
				'randomNum'
			])
		}
	}
</script>

<style>
</style>