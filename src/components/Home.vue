<template>
	<div class="jumbotron mt-3">
		<h3>Trade or View Your Portfolio</h3>
		<p>Click on 'End Day' to begin a new day</p>
		<hr>
		<p>Your Funds: {{ funds }}</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				funds: this.$store.state.funds
			}
		}
	}
</script>

<style></style>