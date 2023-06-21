<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div style="display: flex; justify-content: center;">
  <img style="width:360px; height:200px;" ref="img" src="../assets/img/cara_logo.png"  />
</div>
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-success text-gradient">
                    Welcome back
                  </h3>
                  <p class="mb-0">Enter your ID and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start" @submit.prevent="onSubmit">
                    <q-col cols="12" md="6" class="q-mb-md">
  <q-input rounded outlined v-model="loginForm.user_id" placeholder="ID"></q-input>
</q-col>
<q-col cols="12" md="6" class="q-mb-md">
  <q-input rounded outlined type="password" v-model="loginForm.password" placeholder="Password"></q-input>
</q-col>



                    <div class="text-center">
                      <soft-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                        @click="signIn"
                      >Sign in</soft-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link
                      :to="{ name: 'Sign Up' }"
                      class="text-success text-gradient font-weight-bold"
                    >Sign up</router-link>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved9.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>



<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import SoftButton from "@/components/SoftButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";


export default {
  name: "SignIn",
  components: {
    Navbar,
    AppFooter,
    SoftButton,
  },
  data() {
    return {
      loginForm: {
        user_id: '',
        password: ''
      },
      rememberMe: true,
      error: null,
    };
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async signIn() {
  console.log('entered email', this.loginForm.email)
  console.log('entered password', this.loginForm.password)
  try {
    const response = await fetch(
      "https://api.caramyaeon.com.my/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.loginForm.user_id,
          password: this.loginForm.password,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      this.error = data.message;
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name); // save name in local storage
      localStorage.setItem("role", data.role); // save role in local storage
      console.log('API Response:', data);
      // Redirect to the dashboard or homepage
      this.$router.replace('/dashboard');
      console.log(this.$router)
    }
  } catch (error) {
    console.log(error);
    this.error = "An error occurred. Please try again later.";
  }
},
    onSubmit() {
      console.log("Form submitted");
      this.signIn();
    },
  },
};
</script>
