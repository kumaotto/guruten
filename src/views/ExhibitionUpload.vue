<template>
  <div>
    <Header/>
    <section>
      <div v-if="saved">
        <div :class="$style.finished">
          <h2 :class="$style.finText">登録が完了しました！</h2>
          <p>マイページから作品を登録して、展示会を充実させましょう</p>
          <img :class="$style.finImage" src="@/assets/registerFin.png">
          <Button :isButtonRed="true" @click="onClickMypage">マイページへ</Button>
        </div>
      </div>
      <div v-else>
        <h1>作品展を開催する</h1>
        <div :class="$style.form">
          <p :class="$style.label">作品展のメインヴィジュアルを選択</p>
          <FileUpload
            v-model="fileItems"
            :class="$style.fileUpload"
            :accept="'image/*'"
            :fileItems="null"
            :fileSizeLimit="30 * 1024 * 1024"
            :filesLengthLimit="1"
            @uploadFile="upload"
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
            :disabled="false"
            :isButtonRed="true"
            @click="submit()"
          >
            開催する
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>E83636

<script>
import firebase from 'firebase/app';
import { upload, download } from '@/firebase/storage.js'
import Header from '@/components/Organisms/Header'
import FileUpload from '@/components/Molecules/FileUpload'
import TextFiled from '@/components/Molecules/TextField'
import TextAreaFiled from '@/components/Molecules/TextAreaField'
// import TagField from '@/components/Molecules/TagField'
import Button from '@/components/Atoms/Button'

export default {
  name: 'ExhibitionUpload',
  components: {
    Header,
    FileUpload,
    TextFiled,
    // TagField,
    Button,
    TextAreaFiled,
  },
  data() {
    return {
      fileItems: null,
      // tag_str: '',
      name: '',
      description: '',
      saved: false,
      progress: 0,
    };
  },
  methods: {
    submit() {
      upload(this.fileItems, this.fileItems.name).on(
        "state_changed",
        null,
        error => {
          console.error(error);
        },
        () => {
          download(this.fileItems.name)
            .then((imageURL) => {
              this.fileItems = imageURL;

              const colref = firebase.firestore().collection("exhibitions");
              // タイムスタンプ作成
              const createdAt = firebase.firestore.Timestamp.fromDate(new Date());
              // ユーザーID取得
              const userId = firebase.auth().currentUser.uid;
              const userName = firebase.auth().currentUser.displayName;
              // 保存用jsonデータ作成
              const data = {
                exhibitionId: colref.doc().id,
                fileItems: this.fileItems,
                name: this.name,
                description: this.description,
                // tags: this.tag_str,
                createdAt: createdAt,
                createdBy: userId,
                createdByUserName: userName,
                artworks: [],
              };
              // データを渡す
              colref.add(data).then((docRef) => {
                // 正常にデータ保存できた時の処理
                console.log("Document written with ID: ", docRef.id);
                this.saved = true;
              }).catch((error) => {
                // エラー発生時の処理
                console.error("Error adding document: ", error);
              })
          })
          .catch((error) => {
            console.error(error);
          })
        }
      )
    },
    onClickMypage() {
      this.$router.push('/mypage', () => {});
    },
    upload(value) {
      this.fileItems = value;
    },
  },
}
</script>

<style module>
h1 {
  text-align: center;
}
.form {
  background-color: #F4F4F4;
  padding: 20px 10px;
}
.fileUpload {
  margin-bottom: 30px;
  background-color: #fff;
  width: 30%;
  margin: 0 auto;
  margin-bottom: 30px;
  min-height: 40px;
}
.label {
  font-size: 14px;
  margin-bottom: 0;
}
.finText {
  font-size: 20px;
  font-weight: bold;
}
.finished {
  padding: 20px 10px;
}
.finImage {
  width: 40%;
}
</style>