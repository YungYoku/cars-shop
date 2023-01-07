<template>
  <div class="login">
    <h2>Вход</h2>

    <v-form novalidate @submit.prevent="submit">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "login-view",

  setup: () => ({ v$: useVuelidate() }),

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
    passwordErrors: "",
  }),

  computed: {
    ...mapGetters({ wrongPassword: "wrongPassword" }),
  },

  methods: {
    async submit() {
      this.$store.commit("resetAuthErrors");

      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        signInWithEmailAndPassword(getAuth(), this.email, this.password).then(
          async (response) => {
            const uid = response.user.uid;
            this.$store.commit("setUid", uid);
            await this.$router.push("/");
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
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
    justify-content: center;
    align-items: center;
    padding: 30px 40px 20px 40px;
    margin: 0 auto;
    min-width: 400px;
    background-color: #fbfaf7;
    border-radius: 30px;
    display: grid;
    grid-template: 70px 70px 90px 30px / 1fr;
    box-shadow: 0 10px 20px 6px #dddddd;
    grid-gap: 15px;

    label img {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }

    .btnSubmit {
      border-radius: 20px;
    }

    .swap {
      display: flex;
      justify-content: center;

      h5 {
        font-weight: 600;
        color: gray;
        position: relative;
        cursor: pointer;
      }

      h5::after {
        content: "";
        width: 0;
        height: 2px;
        position: absolute;
        background-color: #333333;
        left: 0;
        bottom: -2px;
        transition: all 0.4s;
      }

      h5:hover::after {
        width: 100%;
        transition: all 0.4s;
      }
    }
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
