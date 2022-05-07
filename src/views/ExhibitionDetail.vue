<template>
  <div>
    <Header />
      <section>
      <div :class="$style.topImageWpapper">
        <ImageUrl :class="$style.topImage" :url="this.data.fileItems"/>
        <div :class="$style.caption">
          <h1 :class="$style.title">{{ this.data.name }}</h1>
          <p :class="$style.description">{{ this.data.description }}</p>
        </div>
      </div>
      <h2>作品一覧</h2>
      <div :class="$style.artCards">
        <template v-for="(works, index) in this.data.artworks">
          <div :class="$style.artCard" :key="index">
            <ImageUrl :url="works.artwork"/>
            <p :class="$style.workTitle">{{ works.artworkName }}</p>
            <p :class="$style.workText">{{ works.author }}</p>
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
  name: 'ExhibitionDetail',
  components: {
    Header,
    ImageUrl,
  },
  data() {
    return {
      data: null,
    }
  },
  created() {
    firebase.firestore()
      .collection('exhibitions')
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.data = doc.data();
      })
  }
}
</script>

<style module>
.title {
  text-align: left;
}
h2 {
  text-align: center;
  margin-top: 7%;
}
.topImageWpapper {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 80px;
  width: 80%;
}
.topImage {
  width: 22%;
}
.caption {
  margin-left: 3%;
}
.artCards {
  display: flex;
  justify-content: center;
}
.artCard {
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);
  width: fit-content;
  margin: 0 10px;
}
.workTitle {
  margin: 3px 0 0 10px;
  text-align:left;
}
.workText {
  margin: 3px 0 5px 10px;
  text-align:left;
}
.description {
  text-align: left;
}
</style>