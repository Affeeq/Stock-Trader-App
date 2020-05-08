<template>
	<div class="container">
		<div class="container">
		<h1 class="text-center">Sign In</h1>
		<form>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" class="form-control" id="password" v-model="password">
			</div>
			<button type="submit" class="btn btn-primary" @click.prevent="signIn({ email, password })">Submit</button>
		</form>
	</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		data() {
			return {
				email: '',
				password: ''
			}
		},
		methods: {
			...mapActions('data', [
				'signIn'
			])
		}
	}
</script>

<style></style>