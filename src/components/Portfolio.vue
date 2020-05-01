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
						<input 
							type="number" 
							placeholder="Quantity" 
							v-model="quantity[index]" 
							@blur="clear(quantity[index], index)"
							:class="{ danger: disable(quantity[index], pf.price, pf.quantity) }"
						>
						<button 
							class="btn btn-danger float-md-right mt-3 mt-md-0" 
							@click="sellStocks({pf, index})"
							:disabled="disable(quantity[index], pf.price, pf.quantity)"
						>Sell</button>
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
			disable(quantity, price, portfolioQuantity) {
				return quantity <= 0 || (quantity - Math.floor(quantity)) !== 0 || quantity > portfolioQuantity;
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