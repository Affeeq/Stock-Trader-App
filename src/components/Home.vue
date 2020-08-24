<template>
	<b-jumbotron class="mt-3">
		<h3>Trade or View Your Portfolio</h3>
		<p>Click on 'End Day' to begin a new day</p>
		<hr>
		<p v-if="auth">Your Funds: {{ funds }}</p>
	</b-jumbotron>
</template>

<script>
	import { mapGetters } from 'vuex';
	
	export default {
		computed: {
			...mapGetters({
				funds: 'custom/getFunds',
				auth: 'data/isAuthenticated'
			})
		}
	}
</script>

<style></style>