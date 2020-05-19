<template>
	<b-container>
		<b-row>
			<b-col cols="6" class="mt-3" v-for="(portfolioStock, index) in portfolio" :key="portfolio.portfolioStock">
				<app-portfolio-stocks :portfolioStock="portfolioStock" :index="index"></app-portfolio-stocks>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import PortfolioStocks from './Portfolio-Stocks.vue';
	export default {
		data() {
			return {
				portfolio: this.$store.state.portfolio.portfolio
			}
		},
		components: {
			appPortfolioStocks: PortfolioStocks
		}
	}
</script>

<style>
</style>