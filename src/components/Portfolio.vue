<template>
	<div class="container">
		<div class="row">
			<div class="col-6 mt-3" v-for="stock in portfolio">
				<div class="card">
					<div class="card-header">
						<h5 class="card-title">{{ stock.name }}</h5>
						<p>(Price: {{ stock.price }}| Quantity: )</p>
					</div>
					<div class="card-body">
						<input type="number" placeholder="Quantity">
						<a class="btn btn-primary float-right">Sell</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				portfolio: this.$store.state.portfolio
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