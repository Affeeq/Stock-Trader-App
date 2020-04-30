<template>
	<div class="container">
		<div class="row">
			<div class="col-6 mt-3" v-for="(pf, index) in portfolio">
				<div class="card">
					<div class="card-header bg-primary">
						<h5 class="card-title">{{ pf.name }}</h5>
						<p>(Price: {{ pf.price }} | Quantity: {{ pf.quantity }} )</p>
					</div>
					<div class="card-body text-center text-md-left">
						<input type="number" placeholder="Quantity" v-model="quantity[index]" @blur="clear(index)">
						<a class="btn btn-danger float-md-right mt-3 mt-md-0" @click.stop="sellStocks({pf, index})">Sell</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		data() {
			return {
				portfolio: this.$store.state.portfolio.portfolio,
				quantity: this.$store.state.custom.quantity
			}
		},
		methods: {
			...mapActions('portfolio', [
				'sellStocks'
			]),
			...mapActions('custom', [
				'clear'
			])
		}
	}
</script>

<style>
	.card-title {
		margin: 0;
		display: inline;
	}

	.card-title + p {
		display: inline;
	}

	@media (max-width: 600px) {
		input {
			width: 75%;
		}
	}
</style>