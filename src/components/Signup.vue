<template>
	<div class="container">
		<h1 class="text-center">Sign Up</h1>
		<form>
			<div class="form-group">
				<label for="email">Email</label>
				<small v-if="!isEmail && focusedValidation.focusedEmail && !isEmailRegistered">Please type a correct email</small>
				<small v-if="isEmailRegistered">That email already existed</small>
				<input 
					type="email"
					class="form-control" 
					:class="{ danger: (!isEmail && focusedValidation.focusedEmail) || isEmailRegistered }" 
					id="email" 
					v-model="user.email" 
					placeholder="jane@doe.com"
					@blur="focused('focusedEmail')"
					>
			</div>
			<div class="form-group">
				<label for="confirmEmail">Confirm Email</label>
				<small v-if="!isConfirmEmail && focusedValidation.focusedConfirmEmail">Email does not match</small>
				<input 
					type="email" 
					class="form-control" 
					:class="{danger: !isConfirmEmail && focusedValidation.focusedConfirmEmail}" 
					id="confirmEmail" 
					v-model="confirmEmail" 
					placeholder="jane@doe.com"
					@blur="focused('focusedConfirmEmail')"
					>
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<small v-if="!isPassword && focusedValidation.focusedPassword">Password needs to be longer than 6 characters</small>
				<input 
					type="password" 
					class="form-control" 
					:class="{danger: !isPassword && focusedValidation.focusedPassword}" 
					id="password" 
					v-model="user.password"
					@blur="focused('focusedPassword')"
					>
			</div>
			<div class="form-group">
				<label for="confirmPassword">Confirm Password</label>
				<small v-if="!isConfirmPassword && focusedValidation.focusedConfirmPassword">Passwords do not match!</small>
				<input 
					type="password" 
					class="form-control" 
					:class="{danger: !isConfirmPassword && focusedValidation.focusedConfirmPassword}" 
					id="confirmPassword" 
					v-model="confirmPassword"
					@blur="focused('focusedConfirmPassword')"
				>
			</div>
			<button type="submit" class="btn btn-primary" @click.prevent="checkForm">Submit</button>
		</form>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
 
	export default {
		data() {
			return {
				user: {
					email: null,
					password: null
				},
				confirmEmail: null,
				confirmPassword: null,
				emailReg: RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
				focusedValidation: {
					focusedEmail: false,
					focusedConfirmEmail: false,
					focusedPassword: false,
					focusedConfirmPassword: false
				},
				isEmail: false,
				isConfirmEmail: false,
				isPassword: false,
				isConfirmPassword: false
			}
		},
		methods: {
			...mapActions('data', [
				'signUp',
				'checkEmailExist'
			]),
			checkForm() {
				this.validation();
				if (this.isEmail && this.isConfirmEmail && this.isPassword && this.isConfirmPassword && !this.isEmailRegistered) {
					this.signUp(this.user);
				}
			},
			focused(dataName) {
				this.$set(this.focusedValidation, dataName, true );
				(dataName === 'focusedEmail') 			? this.checkEmail()
				:(dataName === 'focusedConfirmEmail') 	? this.checkConfirmEmail()
				:(dataName === 'focusedPassword')		? this.checkPassword()
														: this.checkConfirmPassword();
			},
			checkEmail() {
				(this.emailReg.test(this.user.email)) 	? (this.isEmail = true, this.checkEmailExist(this.checkEmailRegistered))
														: this.isEmail = false;
			},
			checkConfirmEmail() {
				(this.confirmEmail === this.user.email)	? this.isConfirmEmail = true
														: this.isConfirmEmail = false;
			},
			checkPassword() {
				(this.user.password && this.user.password.length >= 6)	? this.isPassword = true
																		: this.isPassword = false;
			},
			checkConfirmPassword() {
				(this.confirmPassword === this.user.password)	? this.isConfirmPassword = true
																: this.isConfirmPassword = false;
			},
			validation() {
				this.checkEmail()
				this.checkConfirmEmail()
				this.checkPassword()        
				this.checkConfirmPassword();
				if (!this.focusedValidation.focusedEmail) {
					this.focused('focusedEmail')
				}
				if (!this.focusedValidation.focusedConfirmEmail) {
					this.focused('focusedConfirmEmail')
				}
				if (!this.focusedValidation.focusedPassword) {
					this.focused('focusedPassword')
				}
				if (!this.focusedValidation.focusedConfirmPassword) {
					this.focused('focusedConfirmPassword')
				}
			}
		},
		computed: {
			checkEmailRegistered() {
				let obj = {
					email: this.user.email,
					uri: window.location.href // document.URL does not work for firefox
				}
				return obj;
			},
			...mapGetters('data',[
				'isEmailRegistered'
			])
		},
		watch: {
			// data in objects: need to use '' to access it
			'user.email'() {
				if (this.focusedValidation.focusedEmail) {
					this.checkEmail();
				}
			},
			confirmEmail() {
				if (this.focusedValidation.focusedConfirmEmail) {
					this.checkConfirmEmail();
				}
			},
			'user.password'() {
				if (this.focusedValidation.focusedPassword) {
					this.checkPassword();
				}
			},
			confirmPassword() {
				if (this.focusedValidation.focusedConfirmPassword) {
					this.checkConfirmPassword();
				}
			}
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