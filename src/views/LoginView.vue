<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  validatePassword,
} from 'firebase/auth'
import { onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const auth = getAuth()
const userStore = useUserStore()

const formData = ref({
  userFirstName: '',
  userLastName: '',
  userEmail: '',
  userPassword: '',
})

// Add validation state
const validationErrors = ref({
  password: '',
  email: '',
  general: '',
})

const isValidating = ref(false)

/* Handles if login or register */
const isLogin = ref(false)

// Real-time password validation
const validatePasswordRealTime = async () => {
  if (!formData.value.userPassword || isLogin.value) {
    validationErrors.value.password = ''
    return
  }

  try {
    isValidating.value = true
    const passwordValidation = await validatePassword(auth, formData.value.userPassword)

    if (!passwordValidation.isValid) {
      validationErrors.value.password =
        passwordValidation.errorMessage || 'Password does not meet requirements'
    } else {
      validationErrors.value.password = ''
    }
  } catch (error) {
    validationErrors.value.password = 'Password validation error: ' + error.message
  } finally {
    isValidating.value = false
  }
}

const handleSubmit = async (event) => {
  // Clear previous errors
  validationErrors.value = { password: '', email: '', general: '' }

  if (isLogin.value) {
    firebaseLoginUser(event)
  } else {
    // Validate password before registration
    const password = event.target.password.value

    try {
      const passwordValidation = await validatePassword(auth, password)

      if (passwordValidation.isValid) {
        firebaseRegisterUser(event)
      } else {
        validationErrors.value.password =
          passwordValidation.errorMessage || 'Password validation failed'
      }
    } catch (error) {
      validationErrors.value.password = 'Password validation error: ' + error.message
    }
  }
}

/* Toggles between login and register forms*/
const toggleLoginRegister = () => {
  isLogin.value = !isLogin.value
  // Clear validation errors when switching modes
  validationErrors.value = { password: '', email: '', general: '' }
  formData.value.userPassword = ''
}

const firebaseLoginUser = (event) => {
  formData.value.userEmail = event.target.email.value
  formData.value.userPassword = event.target.password.value
  signInWithEmailAndPassword(auth, formData.value.userEmail, formData.value.userPassword)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('Login successful:', user)
      userStore.login(user)
      router.push({ name: 'account' })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('Login error:', errorCode, errorMessage)

      // Set specific error messages based on error code
      if (errorCode === 'auth/user-not-found') {
        validationErrors.value.email = 'No account found with this email'
      } else if (errorCode === 'auth/wrong-password') {
        validationErrors.value.password = 'Incorrect password'
      } else if (errorCode === 'auth/invalid-email') {
        validationErrors.value.email = 'Invalid email address'
      } else {
        validationErrors.value.general = errorMessage
      }
    })
}

const firebaseRegisterUser = (event) => {
  formData.value.userEmail = event.target.email.value
  formData.value.userPassword = event.target.password.value
  createUserWithEmailAndPassword(auth, formData.value.userEmail, formData.value.userPassword)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('Registration successful:', user)
      userStore.login(user)
      router.push({ name: 'account' })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('Registration error:', errorCode, errorMessage)

      // Set specific error messages based on error code
      if (errorCode === 'auth/email-already-in-use') {
        validationErrors.value.email = 'An account with this email already exists'
      } else if (errorCode === 'auth/invalid-email') {
        validationErrors.value.email = 'Invalid email address'
      } else if (errorCode === 'auth/weak-password') {
        validationErrors.value.password = 'Password is too weak'
      } else {
        validationErrors.value.general = errorMessage
      }
    })
}

onMounted(() => {
  if (localStorage.getItem('isUserLoggedIn')) {
    userStore.login(userStore.isAuthenticated)
    router.push({ name: 'account' })
  }
})
</script>

<template>
  <div class="login-container">
    <div class="login-card text-center">
      <h2 class="mb-4" v-if="isLogin">Sign In</h2>
      <h2 class="mb-4" v-else>Register</h2>

      <!-- General error alert -->
      <div v-if="validationErrors.general" class="alert alert-danger" role="alert">
        {{ validationErrors.general }}
      </div>

      <form @submit.prevent="handleSubmit">
        <!-- ...existing firstName/lastName fields... -->
        <div class="row mb-3" v-if="!isLogin">
          <div class="col m-6">
            <label for="firstName" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              aria-describedby="nameHelp"
              required
            />
          </div>
          <div class="col m-6">
            <label for="lastName" class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              aria-describedby="nameHelp"
              required
            />
          </div>
        </div>

        <!-- Email field with validation -->
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            :class="{ 'is-invalid': validationErrors.email }"
            id="email"
            v-model="formData.userEmail"
            aria-describedby="emailHelp"
            required
          />
          <div v-if="validationErrors.email" class="invalid-feedback">
            {{ validationErrors.email }}
          </div>
        </div>

        <!-- Password field with validation -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': validationErrors.password }"
            id="password"
            v-model="formData.userPassword"
            @input="!isLogin && validatePasswordRealTime()"
            required
          />
          <div v-if="validationErrors.password" class="invalid-feedback">
            {{ validationErrors.password }}
          </div>
          <div v-if="!isLogin && isValidating" class="form-text">
            <span
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Validating password...
          </div>
        </div>

        <!-- checkbox and submit button -->
        <div class="mb-3 form-check text-start" v-if="isLogin">
          <input type="checkbox" class="form-check-input" id="rememberMe" />
          <label class="form-check-label" for="rememberMe">Remember me</label>
        </div>
        <button type="submit" class="btn btn-primary w-100" v-if="isLogin">Sign In</button>
        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="validationErrors.password && !isLogin"
          v-else
        >
          Register
        </button>
      </form>

      <!-- Toggle links -->
      <div class="mt-3" v-if="isLogin">
        <a href="#" class="link-secondary">Forgot my password</a> |
        <a href="#" class="link-secondary" @click="toggleLoginRegister">Create an account</a>
      </div>
      <div class="mt-3" v-else>
        <a href="#" class="link-secondary" @click="toggleLoginRegister">Back to Login</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  max-width: 360px;
  margin: auto;
  padding: 15px;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.login-container {
  min-height: calc(100vh - 150px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  display: block;
  margin: 0 auto 20px;
}
</style>
