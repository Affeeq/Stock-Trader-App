<template>
	<b-card no-body>
		<b-card-header header-bg-variant="primary">
			<b-card-title title-tag="h5">{{ portfolioStock.name }}</b-card-title>
			<p>(Price: {{ portfolioStock.price }} | Quantity: {{ portfolioStock.quantity }} )</p>
		</b-card-header>
		<b-card-body class="text-center text-md-left">
			<input 
			type="number" 
			placeholder="Quantity" 
			v-model="quantity" 
			@blur="clear(quantity, index)"
			:class="{ danger: disable(quantity, portfolioStock.quantity) }"
			>
			<b-button
			variant="danger"
			class="float-md-right mt-3 mt-md-0" 
			@click="sellStocks({portfolioStock, index})"
			:disabled="disable(quantity, portfolioStock.quantity)"
			>Sell</b-button>
		</b-card-body>
	</b-card>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		data() {
			return {
				quantity: ''
			}
		},
		props: ['portfolioStock', 'index'],
		methods: {
			...mapActions('portfolio', [
				'sellStocks'
			]),
			...mapActions('custom', [
				'currentQuantity'
			]),
			disable(userQuantity, portfolioQuantity) {
				return userQuantity <= 0 || parseInt(userQuantity) > parseInt(portfolioQuantity) || (userQuantity - Math.floor(userQuantity)) !== 0;
			},
			clear(quantity,index) {
				this.currentQuantity(quantity);
				let vm = this;
				setTimeout(function() { vm.quantity = '' }, 200);
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