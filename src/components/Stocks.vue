<template>
	<b-container>
		<b-row>
			<b-col cols="6" class="mt-3" v-for="(stock, index) in stocks" :key="stocks.stock">
				<b-card no-body>
					<b-card-header header-bg-variant="success">
						<b-card-title title-tag="h5">{{ stock.name }}</b-card-title>
						<p>(Price: {{ stock.price }})</p>
					</b-card-header>
					<b-card-body class="text-center text-md-left">
						<input 
							:id="stock.name" 
							type="number" 
							placeholder="Quantity" 
							v-model="quantity[index]" 
							@blur="clear(quantity[index], index)" 
							:class="{ danger: disable(quantity[index], stock.price) }"
						>
						<b-button 
							variant="success"
							class="float-md-right mt-3 mt-md-0" 
							@click="buyStocks(stock)" 
							:disabled="disable(quantity[index], stock.price)"
							>Buy
						</b-button>
					</b-card-body>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		data() {
			return {
				quantity: [],
				stocks: this.$store.state.stocks.stocks,
				funds: this.$store.state.custom.funds
			};
		},
		methods: {
			...mapActions('stocks', [
				'buyStocks'
			]),
			...mapActions('custom', [
				'currentQuantity'
			]),
			disable(quantity, price) {
				return quantity <= 0 || (quantity - Math.floor(quantity)) !== 0 || this.funds - (price * quantity) < 0;
			},
			clear(quantity, index) {
				this.currentQuantity(quantity);
				let vm = this;
				setTimeout(function() { vm.quantity.splice(index, 1, '') }, 200);
			}
		}
	}
</script>

<style scoped>
	.card-title {
		margin: 0;
		display: inline;
	}

	.card-title + p {
		display: inline;
	}

	.danger:focus {
		outline: none !important;
		border:1px solid red;
		box-shadow: 0 0 10px red;
	}

	@media (max-width: 600px) {
		input {
			width: 75%;
		}
	}
</style>