<template>
	<div class="container">
		<h1 class="text-center">Sign Up</h1>
		<form>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
			</div>
			<div class="form-group">
				<label for="confirmEmail">Confirm Email</label>
				<input type="email" class="form-control" id="confirmEmail" aria-describedby="emailHelp">
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" class="form-control" id="password" v-model="password">
			</div>
			<div class="form-group">
				<label for="confirmPassword">Confirm Password</label>
				<input type="password" class="form-control" id="confirmPassword">
			</div>
			<button type="submit" class="btn btn-primary" @click.prevent="signUp({email, password})">Submit</button>
		</form>
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
				'signUp'
			])
		}
	}
</script>

<style></style>