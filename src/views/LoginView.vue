<template>
  <div class="login">
    <h2>Вход</h2>

    <v-form novalidate @submit.prevent="login">
      <v-text-field
        v-model.trim="email"
        :error-messages="emailErrors"
        :rules="[() => !!email || 'Почта отсутствует.']"
        label="E-mail"
        required
      />

      <v-text-field
        v-model.trim="password"
        :error-messages="passwordErrors"
        :rules="[
          () => !!password || 'Пароль отсутствует.',
          () => password.length >= 6 || 'Пароль меньше 6 символов.',
          () =>
            /[A-Z]/.test(password) || 'Пароль должен содержать заглавные буквы',
          () =>
            /[a-z]/.test(password) || 'Пароль должен содержать прописные буквы',
          () => /[0-9]/.test(password) || 'Пароль должен содержать цифры',
        ]"
        label="Пароль"
        required
        type="password"
      />

      <v-btn class="btnSubmit" type="submit">Войти</v-btn>
      <router-link class="swap" to="/reg">
        <h5>Нет аккаунта? Зарегистрироваться.</h5>
      </router-link>
    </v-form>

    <v-alert v-if="alert" class="alert" prominent type="error" variant="flat">
      {{ alert }}
    </v-alert>
  </div>
</template>

<script>
import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUserStore } from "@/store/user";
import { useLoadingStore } from "@/store/loading";

export default {
  name: "login-view",

  setup: () => ({
    v$: useVuelidate(),
    userStore: useUserStore(),
    loadingStore: useLoadingStore(),
  }),

  validations: {
    email: { required },
    password: {
      required,
      minLength: minLength(6),
      containsUppercase: function (value) {
        return /[A-Z]/.test(value);
      },
      containsLowercase: function (value) {
        return /[a-z]/.test(value);
      },
      containsNumber: function (value) {
        return /[0-9]/.test(value);
      },
    },
  },

  data: () => ({
    email: "",
    password: "",
    emailErrors: "",
    emailError: null,
    passwordErrors: "",
    passwordError: null,
  }),

  watch: {
    email() {
      this.emailError = null;
    },

    password() {
      this.passwordError = null;
    },
  },

  computed: {
    alert() {
      return this.emailError || this.passwordError || null;
    },
  },

  methods: {
    handleLoginError(error) {
      switch (error.code) {
        case "auth/invalid-email":
          this.emailError = "Несуществующая почта";
          break;
        case "auth/wrong-password":
          this.passwordError = "Неправильный пароль";
          break;
      }
    },

    async handleLoginResponse(response) {
      const uid = response.user.uid;

      this.userStore.updateUid(uid);
      await this.userStore.loadUser();

      await this.$router.push("/");
    },

    async login() {
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        this.loadingStore.start();
        await signInWithEmailAndPassword(getAuth(), this.email, this.password)
          .then(this.handleLoginResponse)
          .catch(this.handleLoginError)
          .finally(() => {
            this.loadingStore.end();
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  padding: 50px 0 50px 0;

  h2 {
    font-size: 32px;
    font-weight: 500;
    color: #999999;
    text-align: center;
  }

  form {
    width: 30%;
    min-width: 400px;

    display: grid;
    grid-template: 70px 70px 90px 30px / 1fr;
    justify-content: center;
    align-items: center;
    grid-gap: 15px;

    padding: 30px 30px 20px 30px;
    margin: 0 auto;

    background-color: #fbfaf7;
    border-radius: 10px;
    box-shadow: 0 9px 15px 4px #e8e7e7;

    label {
      img {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }
    }

    .swap {
      display: flex;
      justify-content: center;

      h5 {
        position: relative;

        font-size: 13px;
        font-weight: 600;
        color: gray;

        cursor: pointer;
      }

      h5::after {
        content: "";
        width: 0;
        height: 1px;
        position: absolute;
        background-color: #666666;
        left: 0;
        bottom: -2px;
        transition: all 0.2s;
      }

      h5:hover::after {
        width: 100%;
        transition: all 0.2s;
      }
    }
  }

  .alert {
    position: absolute;
    bottom: 0;

    z-index: 4;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 50px;
    }
  }

  @media screen and (max-width: 480px) {
    form {
      width: 30%;
      padding: 30px 40px 20px 40px;
      min-width: 300px;
    }

    h2 {
      font-size: 40px;
    }
  }
}
</style>
