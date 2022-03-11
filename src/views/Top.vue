<template>
  <div>
    <Header/>
    <section>
      <h1>新着作品展</h1>
      <div :class="$style.exhibitions">
        <template v-for="(exhbs, index) in this.exhibitions">
          <div :class="$style.contents" :key="index">
            <div :class="$style.topImageWrapper">
              <ImageUrl :class="$style.topImage" :url="exhbs.image" @click="onClickExhibition(exhbs.id)"/>
            </div>
            <div>
              <p @click="onClickExhibition(exhbs.id)">{{ exhbs.name }}</p>
            </div>
            <div>
              <p @click="onClickExhibition(exhbs.id)">By {{ exhbs.createdByUserName }}</p>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Header from '@/components/Organisms/Header'
import ImageUrl from '@/components/Atoms/ImageUrl';

export default {
  name: 'Top',
  components: {
    Header,
    ImageUrl,
  },
  data() {
    return {
      exhibitions: [],
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
    }
  },
  async created() {
    await firebase.firestore()
      .collection('exhibitions')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().fileItems != '' || doc.data().name != '')
          this.exhibitions.push({
            id: doc.id,
            image: doc.data().fileItems,
            name: doc.data().name,
            createdBy: doc.data().createdBy,
            createdByUserName: doc.data().createdByUserName,
          })
        })
      }, this.exhibitions)
      .catch(error => {
        console.error(error);
      })
  },
}
</script>

<style module>
h1 {
  text-align: left;
}
.exhibitions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.contents {
  margin-left: 20px;
}
.topImageWrapper {
  width: 200px;
  max-height: 300px;
  cursor: pointer;
}
.topImage {
  max-width: 100%;
  width: auto;
}
</style>
