<template>
  <div>
    <Header/>
    <h1>ログイン</h1>
    <form @submit.prevent="signIn">
      <div>
        <label for="email">メールアドレス：</label>
        <input :class="$style.input" type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="password">パスワード：</label>
        <input :class="$style.input" type="password" id="password" v-model="password">
      </div>
      <Button :class="$style.button" :isButtonRed="true" type="login">ログイン</Button>
    </form>
    <div><router-link to="/signup">会員登録はこちら</router-link></div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import "firebase/auth";
import Header from '@/components/Organisms/Header'
import Button from '@/components/Atoms/Button'

export default {
  name: 'SignIn',
  components: {
    Header,
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.$router.push('/')
      })
      .catch((error) => {
        alert(error.massage)
      })
    }
  }
}
</script>

<style module>
.input {
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  width: 300px;
}
.button{
  margin: 30px 0;
}
</style>