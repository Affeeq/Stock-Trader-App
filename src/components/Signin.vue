<template>
	<b-container>
		<h1 class="text-center">Sign In</h1>
		<b-form @submit.prevent="submit(email, password)" id="form">
			<b-form-group label="Email" label-for="email">
				<b-form-input
					id="email"
					type="email"
					v-model="email"
					:class="{ danger: !isSignIn && isSubmit }"
				></b-form-input>
			</b-form-group>
			<b-form-group label="Password" label-for="password">
				<b-form-input
					id="password"
					type="password"
					v-model="password"
					:class="{ danger: !isSignIn && isSubmit }"
				></b-form-input>
			</b-form-group>
			<b-button variant="info" type="submit">Submit</b-button>
			<small v-if="!isSignIn && isSubmit">Email and Password do not match</small>
		</b-form>
	</b-container>
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
				this.signIn({email, password});
				this.isSubmit = true;
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

	.btn {
		display: block;
		margin: 0 auto;
	}

	@media (max-width: 1382px) {
		#form {
			width: 30%;
			margin: 0 auto;
		}
	}

	@media (max-width: 992px) {
		#form {
			width: 40%;
			margin: 0 auto;
		}
	}

	@media (max-width: 768px) {
		#form {
			width: 50%;
			margin: 0 auto;
		}
	}

	@media (max-width: 600px) {
		#form {
			width: 60%;
			margin: 0 auto;
		}
	}

	@media (max-width: 480px) {
		#form {
			width: 70%;
			margin: 0 auto;
		}
	}
</style>