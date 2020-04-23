<template>
	<div class="container">
		<div class="row">
			<div class="col-6 mt-3" v-for="(stock, index) in stocks">
				<div class="card">
					<div class="card-header">
						<h5 class="card-title">{{ stock.name }}</h5>
						<p>(Price: {{ stock.price }})</p>
					</div>
					<div class="card-body">
						<input type="number" placeholder="Quantity" v-model="quantity[index]" @blur="clear(index)">
						<a class="btn btn-primary float-right" @click.stop="buyStocks({stock, index})">Buy</a>
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
				quantity: this.$store.state.quantity,
				stocks: this.$store.state.stocks
			};
		},
		methods: {
			...mapActions([
				'buyStocks',
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
</style>