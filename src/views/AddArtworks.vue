<template>
  <div>
    <Header />
    <template v-if="saved">
      <section>
        <h1>作品が登録されました！</h1>
        <div :class="$style.buttons">
          <Button @click="onClickMypage">マイページへ戻る</Button>
          <Button @click="onClickAddWorks" :isButtonRed="true"
            >別の作品を登録する</Button
          >
        </div>
      </section>
    </template>
    <template v-else>
      <h1 :class="$style.title">作品を追加する</h1>
      <section :class="$style.form">
        <FileUpload
          v-model="artwork"
          :accept="'image/*'"
          :fileItems="null"
          :fileSizeLimit="30 * 1024 * 1024"
          :filesLengthLimit="1"
          @uploadFile="upload"
        />
        <TextFiled v-model="artworkName" :placeholder="'作品名'" />
        <TextFiled v-model="author" :placeholder="'作者名'" />
        <Button @click="onClickSubmit" :isButtonRed="true">追加</Button>
      </section>
    </template>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { uploadWorks, downloadWorks } from "@/firebase/storage.js";
import Header from "@/components/Organisms/Header";
import FileUpload from "@/components/Molecules/FileUpload";
import TextFiled from "@/components/Molecules/TextField";
import Button from "@/components/Atoms/Button";

export default {
  name: "AddArtworks",
  components: {
    FileUpload,
    TextFiled,
    Header,
    Button,
  },
  data() {
    return {
      artwork: "",
      artworkName: "",
      author: "",
      saved: false,
    };
  },
  methods: {
    upload(value) {
      this.artwork = value;
    },
    onClickMypage() {
      this.$router.push("/mypage", () => {});
    },
    onClickAddWorks() {
      this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
    onClickSubmit() {
      uploadWorks(this.artwork, this.artwork.name).on(
        "state_changed",
        null,
        (error) => {
          console.error(error);
        },
        () => {
          downloadWorks(this.artwork.name).then((imageURL) => {
            this.artwork = imageURL;

            const colref = firebase.firestore().collection("exhibitions");
            const userId = this.$route.params.id;
            const data = {
              artworks: firebase.firestore.FieldValue.arrayUnion({
                artwork: this.artwork,
                artworkName: this.artworkName,
                author: this.author,
              }),
            };
            colref
              .doc(userId)
              .set(data, { merge: true })
              .then(() => {
                this.saved = true;
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          });
        }
      );
    },
  },
};
</script>

<style module>
.form {
  background-color: #f4f4f4;
  padding: 20px 10px;
}
.buttons {
  display: flex;
  justify-content: space-evenly;
  margin-top: 70px;
}
.title {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>