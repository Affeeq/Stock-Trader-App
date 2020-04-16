<template>
	<div class="container">
		<div class="row">
			<div class="col-6 mt-3" v-for="stock in stocks">
				<div class="card">
					<div class="card-header">
						<h5 class="card-title">{{ stock.name }}</h5>
						<p>(Price: {{ stock.price }})</p>
					</div>
					<div class="card-body">
						<input type="number" placeholder="Quantity" v-model="quantity">
						<a class="btn btn-primary float-right" @click="buyStocks(stock)">Buy</a>
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
				stocks: this.$store.state.stocks
			};
		},
		methods: {
			...mapActions([
				'buyStocks'
			])
		},
		computed: {
			quantity: {
				get() {
					return this.$store.getters.setQuantity;
				},
				set(value) {
					this.$store.dispatch('setQuantity', value);
				}
			}
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