<template>
	<div class="container">
		<div class="container">
		<h1 class="text-center">Sign In</h1>
		<form>
			<div class="form-group">
				<label for="email">Email</label>
				<input 
					type="email" 
					class="form-control"
					:class="{ danger: !isSignIn && isSubmit }" 
					id="email" 
					v-model="email"
				>
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input 
					type="password" 
					class="form-control"
					:class="{ danger: !isSignIn && isSubmit }" 
					id="password" 
					v-model="password"
				>
			</div>
			<button type="submit" class="btn btn-primary" @click.prevent="submit(email, password)">Submit</button>
			<small v-if="!isSignIn && isSubmit">Email and Password do not match</small>
		</form>
	</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	export default {
		data() {
			return {
				email: null,
				password: null,
				isSubmit: false,
				focusedValidation: {
					focusedEmail: false,
					focusedPassword: false
				}
			}
		},
		methods: {
			...mapActions('data', [
				'signIn'
			]),
			submit(email, password) {
				this.isSubmit = true;
				this.signIn({email, password});
			}
		},
		computed: {
			...mapGetters('data', [
				'isSignIn'
			])
		}
	}
</script>

<style scoped>
	.danger {
		border: 1px solid red;
	}

	.danger:focus {
		outline: none !important;
		border:1px solid red;
		box-shadow: 0 0 5px red;
	}

	small {
		color: red;
	}
</style>