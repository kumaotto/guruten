<template>
  <div>
    <Header/>
    <template v-if="!isRegistered">
    <h1>会員登録</h1>
    <form :class="$style.fromWrapper" @submit.prevent="signUp">
      <div :class="$style.form">
        <label for="email">メールアドレス：</label>
        <input :class="$style.input" type="email" id="email" v-model="email" placeholder="メールアドレス">
      </div>
      <div :class="$style.form">
        <label for="password">パスワード：</label>
        <input :class="$style.input" type="password" id="password" v-model="password" placeholder="パスワード">
      </div>
      <Button :class="$style.button" :isButtonRed="true" type="submit">登録</Button>
    </form>
    <div><router-link to="/signin">登録済みの方はこちら</router-link></div>
    </template>
    <template v-else>
      <h1>登録が完了しました</h1>
      <p>最後にグループ名を入力してください</p>
      <div :class="$style.form">
        <label for="userName">グループ名：</label>
        <input :class="$style.input" type="text" id="userName" v-model="userName" placeholder="例：〇〇美術サークル">
      </div>
      <Button :class="$style.button" :isButtonRed="true" type="submit" @click="submitUserName()">登録</Button>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import "firebase/auth";
import Header from '@/components/Organisms/Header'
import Button from '@/components/Atoms/Button'

export default {
  name: 'SignUp',
  components: {
    Header,
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
      userName: "",
      error: "",
      isRegistered: false,
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(()=> {
          this.sendEmail(this.email)
          this.isRegistered = true;
        })
        .catch((e) => (this.error = e.message));
    },
    sendEmail() {
      const actionCodeSettings = {
        url: "http://" + location.host + "/signin",
      };
      firebase.auth().languageCode = "ja";
      const user = firebase.auth().currentUser;
      user
        .sendEmailVerification(actionCodeSettings)
        .then(() => {
          console.log('sent');
        })
        .catch((e) => console.error(e));
    },
    submitUserName() {
      firebase
        .auth().currentUser
        .updateProfile({
          displayName: this.userName,
        })
        .then(() => {
          alert('登録が完了しました')
          this.$router.push('/', () => {})
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
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
.fromWrapper {
}
.form {
  width: fit-content;
  margin: 0 auto;
}
.button{
  margin: 30px 0;
}
</style>