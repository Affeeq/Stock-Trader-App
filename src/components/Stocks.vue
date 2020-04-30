<template>
	<div class="container">
		<div class="row">
			<div class="col-6 mt-3" v-for="(stock, index) in stocks">
				<div class="card">
					<div class="card-header bg-success">
						<h5 class="card-title">{{ stock.name }}</h5>
						<p>(Price: {{ stock.price }})</p>
					</div>
					<div class="card-body text-center text-md-left">
						<input :id="stock.name" type="number" placeholder="Quantity" v-model="quantity[index]" @blur="clear(index)">
						<a class="btn btn-success float-md-right mt-3 mt-md-0" @click.stop="buyStocks(stock)">Buy</a>
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
				quantity: this.$store.state.custom.quantity,
				stocks: this.$store.state.stocks.stocks
			};
		},
		methods: {
			...mapActions('stocks', [
				'buyStocks'
			]),
			...mapActions('custom', [
				'clear'
			])
		}
	// dynamically name input to select using querySelector, #input1 etc
	// use data to store name
	// put the store name of input into buyStock 
	// do logic in mutation
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