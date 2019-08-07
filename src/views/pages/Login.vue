<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card no-body class="p-4">
            <b-card-body>
              <b-form @submit.prevent="onSubmit">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="email"
                    class="form-control"
                    placeholder="Username"
                    required
                    v-model="email"
                    autocomplete="username email"
                  />
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required
                    v-model="password"
                    autocomplete="current-password"
                  />
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Forgot password?</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userService from "../../services/user.service";
import { async } from "q";
import { debug } from "util";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    async onSubmit(evt) {
      try {
        if (this.email != "" && this.password != "") {
          await userService.login({
            email: this.email,
            password: this.password
          });
          this.$router.replace({ path: "/notifications" });
        }
      } catch (error) {
        alert(JSON.stringify(error));
      }
    },
    onRegister(evt) {
      evt.preventDefault();
      this.$router.push("/register");
    }
  }
};
</script>
