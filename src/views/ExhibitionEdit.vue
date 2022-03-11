<template>
  <div>
    <Header />
    <template v-if="!this.deleted">
      <h1>作品展情報を編集</h1>
        <div :class="$style.form">
          <FileUpload
            v-model="fileItems"
            :accept="'image/*'"
            :fileItems="null"
            :fileSizeLimit="30 * 1024 * 1024"
            :filesLengthLimit="1"
          />
          <TextFiled
            v-model="name"
            :placeholder="'展示会名'"
          />
          <TextAreaFiled
            v-model="description"
            :placeholder="'展示会説明'"
          />
          <Button
            :class="$style.submit"
            :disabled="false"
            :isButtonRed="true"
            @click="submit()"
          >
            更新
          </Button>
          <hr :class="$style.border">
          <Button
            :disabled="false"
            @click="deleteExhibition()"
          >
            削除する
          </Button>
        </div>
      </template>
      <template v-else>
        <h2>削除しました</h2>
        <Button :isButtonRed="true" @click="onClickMypage">マイページへ戻る</Button>
      </template>
  </div>
</template>

<script>
import firebase from 'firebase/app';
// import { upload, download } from '@/firebase/storage.js'
import FileUpload from '@/components/Molecules/FileUpload'
import TextFiled from '@/components/Molecules/TextField'
import TextAreaFiled from '@/components/Molecules/TextAreaField'
// import TagField from '@/components/Molecules/TagField'
import Button from '@/components/Atoms/Button'
import Header from '@/components/Organisms/Header'

export default {
  name: 'ExhibitionEdit',
  components: {
    FileUpload,
    TextFiled,
    TextAreaFiled,
    // TagField,
    Button,
    Header
  },
  data() {
    return {
      fileItems: '',
      name: '',
      description: '',
      tags: '',
      deleted: false,
    }
  },
  methods: {
    submit() {
      console.log('submit');
    },
    deleteExhibition() {
      firebase.firestore().collection('exhibitions').doc(this.$router.currentRoute.params.id).delete()
      .then(() => {
        this.deleted = true;
      })
      .catch((error) => {
        console.error(error);
      })
    },
    onClickMypage() {
      this.$router.push('/mypage', () => {});
    }
  },
  async created() {
    var docRef = await firebase.firestore().collection('exhibitions').doc(this.$route.params.id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        this.fileItems = doc.data().fileItems;
        this.name = doc.data().name;
        this.description = doc.data().description;
        // this.tags = doc.data().tags;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }
}
</script>

<style module>
.form {
  background-color: #F4F4F4;
  padding-bottom: 30px;
}
.border {
  width: 60%;
  border-color: rgba(244,244,244, 0.4);
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
}
.submit {
  margin-top: 50px;
}
</style>