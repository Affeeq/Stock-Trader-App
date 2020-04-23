<template>
	<div class="container">
		<div class="row">
			<div class="col-6 mt-3" v-for="(pf, index) in portfolio">
				<div class="card">
					<div class="card-header">
						<h5 class="card-title">{{ pf.name }}</h5>
						<p>(Price: {{ pf.price }} | Quantity: {{ pf.quantity }} )</p>
					</div>
					<div class="card-body">
						<input type="number" placeholder="Quantity" v-model="quantity[index]" @blur="clear(index)">
						<a class="btn btn-primary float-right" @click.stop="sellStocks({pf, index})">Sell</a>
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
				portfolio: this.$store.state.portfolio,
				quantity: this.$store.state.quantity
			}
		},
		methods: {
			...mapActions([
				'sellStocks',
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