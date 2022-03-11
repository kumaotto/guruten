<template>
  <header>
    <ul :class="$style.headerList">
      <img :class="$style.headerLogo" src="@/assets/logo.png" @click="onClickTop">
      <template v-if="this.authenticatedUser">
          <li :class="$style.headerItem" @click="onClickSignUp">会員登録</li>
          <li :class="$style.headerItem" @click="onClickSignin">ログイン</li>
      </template>
      <template v-else>
          <li :class="[$style.headerItem, $style.headerItemExhibition]" @click="onClickUpload">作品展を開催</li>
          <li :class="$style.headerItem" @click="onClickMypage">マイページ</li>
          <li :class="$style.headerItem" @click="logoutUser">ログアウト</li>
      </template>
    </ul>
  </header>
</template>

<script>
import firebase from 'firebase/app';
import "firebase/auth";

export default {
  name: 'Header',
  data() {
    return {
      authenticatedUser: false,
      caneEnter: false,
    }
  },
  methods: {
    onClickTop() {
      this.$router.push('/', () => {});
    },
    onClickSignUp() {
      this.$router.push('/signup', () => {});
    },
    onClickSignin() {
      this.$router.push('/signin', () => {});
    },
    onClickUpload() {
      this.$router.push('/upload', () => {});
    },
    onClickMypage() {
      this.$router.push('/mypage', () => {});
    },
    logoutUser() {
      firebase.auth().signOut();
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authenticatedUser = false;
      } else {
        this.authenticatedUser = true;
      }
    });
  }
}
</script>

<style module>
header {
  margin-top: 25px;
  height: 64px;
}
.headerLogo {
  width: 120px;
  height: auto;
  margin-right: auto;
  cursor: pointer;
}
.headerList {
  list-style: none;
  display: flex;
  align-items: center;
  font-weight: bold;
}
.headerItem {
  width: fit-content;
  padding: 4px 8px;
  cursor: pointer;
  margin: 0 10px;
}
.headerItemExhibition {
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 25px;
  padding: 10px 15px;
  margin-left: 3%;
}
.serchBox {
  height: 10px;
  min-width: 10px;
  width: 35%;
  max-width: 40%;
  padding: 9px 8px;
}
</style>