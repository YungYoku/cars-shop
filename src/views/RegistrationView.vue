<template>
  <div class="registration">
    <h2>Регистрация</h2>

    <form novalidate @submit.prevent="submit">
      <v-text-field
        v-model.trim="name"
        :error-messages="nameErrors"
        label="Имя"
        required
      />

      <v-text-field
        v-model.trim="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
      />

      <v-text-field
        v-model.trim="password"
        :counter="password.length < 8 ? 8 : false"
        :error-messages="passwordErrors"
        label="Пароль"
        required
        type="password"
      />

      <v-btn class="btnSubmit" type="submit">Зарегистрироваться</v-btn>
      <router-link class="swap" to="/login">
        <h5>Есть аккаунт? Войти.</h5>
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { email, minLength, required } from "@vuelidate/validators";

export default {
  name: "registration-view",

  validations: {
    name: { required },
    email: {
      required,
      email,
      emailNotExists: function () {
        return !this.emailExists;
      },
    },
    password: {
      required,
      minLength: minLength(8),
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
    name: "",
    email: "",
    password: "",
  }),

  computed: {
    ...mapGetters({ emailExists: "emailExists" }),

    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Имя отсутствует.");
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("E-mail должен быть валидным.");
      !this.$v.email.required && errors.push("E-mail отсутствует.");
      !this.$v.email.emailNotExists && errors.push("Эта почта занята.");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Минимальная длина пароля 8 символов.");
      !this.$v.password.required && errors.push("Пароль отсутствует.");
      !this.$v.password.containsUppercase &&
        errors.push("Пароль должен содержать буквы верхнего регистра.");
      !this.$v.password.containsLowercase &&
        errors.push("Пароль должен содержать буквы нижнего регистра.");
      !this.$v.password.containsNumber &&
        errors.push("Пароль должен содержать цифры.");
      return errors;
    },
  },

  watch: {
    emailExists() {
      this.$v.$touch();
    },
  },

  methods: {
    submit() {
      this.$store.commit("resetAuthErrors");
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        const info = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch("register", info);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.registration {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: calc(5vh + 70px);

  h2 {
    font-size: 70px;
    font-weight: 500;
    color: #999999;
    text-align: center;
    margin: 10vh 0 5vh 0;
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
    grid-template: 70px 70px 70px 90px 30px / 1fr;
    box-shadow: 0 14px 20px 6px #999999;

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
