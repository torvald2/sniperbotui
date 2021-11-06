<template lang="pug">
  .fixed-top.d-flex.align-items-center.justify-content-center.centred
    b-card.login-card(header-tag="header").text-left
      template(#header)
        b-row.m-1
          b-col(cols=3)
            b-avatar(rounded)
          b-col
            h2 Spinner Bot
      b-card-text
        b-form
          b-form-group(label="Email:" label-for="mail_input" description="Введите валидный e-mail")
              b-form-input(id="mail_input" type="text" required v-model="login")
          b-form-group(label="Пароль" label-for="pass_input")
            b-form-input(id="pass_input" type="password" required v-model="password" )
          b-button(type="button" @click="setToken" variant="primary") Войти
      b-alert(
        variant="danger"
        dismissible
        fade
        :show="showDismissibleAlert"
        @dismissed="showDismissibleAlert=false") Ошибка входа - Возможно не верный логин или пароль
</template>

<script>
import {GetToken} from "../services/api"
import {SetToken} from "../services/cookie"
import {mapMutations} from "vuex"
export default {
  name: "Login",
  data(){
    return{
      login:"",
      password:"",
      showDismissibleAlert:false
    }
  },
  methods:{
    ...mapMutations(["readToken"]),
    async setToken(){
      let data = await GetToken(this.login, this.password)
      if (data.token){
        SetToken({token:data.token, login:this.login})
        this.readToken()
        this.$emit("Logined")
        this.$router.push("/")
      } else {
        this.showDismissibleAlert=true
      }

    }
  }
}
</script>

<style scoped>
.centred{
  bottom: 0;
  overflow-y: auto;
}
.login-card{
  max-width: 700px;
  min-width: 300px;
}

</style>