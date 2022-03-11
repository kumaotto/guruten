<template>
  <div>
    <Header/>
    <section>
      <h1>マイページ</h1>
      <h2>あなたの作品一覧</h2>
      <template v-if="this.myExhibition.length !== 0">
        <div :class="$style.myExhibitions">
          <template v-for="(exhbs, index) in this.myExhibition">
            <div :class="$style.topImageWrapper" :key="index">
              <ImageUrl :class="$style.topImage" :url="exhbs.image" @click="onClickExhibition(exhbs.id)"/>
              <p :class="$style.exhibitionName"  @click="onClickExhibition(exhbs.id)">{{ exhbs.name }}</p>
              <button @click="onClickAddWork(exhbs.id)">作品を追加</button>
              <button @click="onEdit(exhbs.id)">編集</button>
            </div>
          </template>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Header from '@/components/Organisms/Header'
import ImageUrl from '@/components/Atoms/ImageUrl';

export default {
  name: 'MyPage',
  components: {
    Header,
    ImageUrl,
  },
  data() {
    return {
      myExhibition: [],
    }
  },
  methods: {
    onClickExhibition(value) {
      this.$router.push({
        name: 'exhibition',
        params: {
          id: value
        }
      })
    },
    onClickAddWork(id) {
      this.$router.push({
        name: 'addworks',
        params: {
          id: id
        }
      })
    },
    onEdit(id) {
      this.$router.push({
        name: 'editexhibition',
        params: {
          id: id
        }
      })
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        firebase.firestore()
          .collection('exhibitions')
          .where('createdBy', "==", uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.data()) {
                this.myExhibition.push({
                  id: doc.id,
                  image: doc.data().fileItems,
                  name: doc.data().name,
                  createdBy: doc.data().createdBy,
                })
              }
            })
          }, this.myExhibition)
          .catch(error => {
            console.error(error);
          })
      }
    })

  },
}
</script>

<style module>
.myExhibitions {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.topImageWrapper {
  width: 200px;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.04);
  margin-right: 10px;
  padding: 20px;
  margin-bottom: 30px;
}
.topImage {
  max-width: 100%;
  width: auto;
  cursor: pointer;
}
.exhibitionName {
  text-align: left;
  margin-top: 5px;
  font-weight: bold;
  padding: 3px 5px;
  cursor: pointer;
}
.tagRemove {
  text-align: right;
}
</style>