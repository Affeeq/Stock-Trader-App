<template>
	<b-container>
		<b-row>
			<b-col cols="6" class="mt-3" v-for="(pf, index) in portfolio">
				<b-card no-body>
					<b-card-header header-bg-variant="primary">
						<b-card-title title-tag="h5">{{ pf.name }}</b-card-title>
						<p>(Price: {{ pf.price }} | Quantity: {{ pf.quantity }} )</p>
					</b-card-header>
					<b-card-body class="text-center text-md-left">
						<input 
							type="number" 
							placeholder="Quantity" 
							v-model="quantity[index]" 
							@blur="clear(quantity[index], index)"
							:class="{ danger: disable(quantity[index], pf.quantity) }"
						>
						<b-button
							variant="danger"
							class="float-md-right mt-3 mt-md-0" 
							@click="sellStocks({pf, index})"
							:disabled="disable(quantity[index], pf.quantity)"
						>Sell</b-button>
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
				portfolio: this.$store.state.portfolio.portfolio,
				quantity: []
			}
		},
		methods: {
			...mapActions('portfolio', [
				'sellStocks'
			]),
			...mapActions('custom', [
				'currentQuantity'
			]),
			// need to check for danger styling for quantity
			disable(quantity, portfolioQuantity) {
				return quantity <= 0 || quantity > portfolioQuantity || (quantity - Math.floor(quantity)) !== 0;
			},
			clear(quantity,index) {
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