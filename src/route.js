import Vue from 'vue'
import Router from 'vue-router'

import top from '@/views/Top'
import signup from '@/views/SignUp'
import signin from '@/views/SignIn'
import mypage from '@/views/MyPage'
import upload from '@/views/ExhibitionUpload'
import exhibition from '@/views/ExhibitionDetail'
import addartwork from '@/views/AddArtworks'
import editexhibition from '@/views/ExhibitionEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: top
    },
    {
      path: '/signup',
      component: signup
    },
    {
      path: '/signin',
      component: signin
    },
    {
      path: '/mypage',
      component: mypage
    },
    {
      path: '/upload',
      component: upload
    },
    {
      name: 'exhibition',
      path: '/exhibition/:id',
      component: exhibition,
      props: true,
    },
    {
      name: 'addworks',
      path: '/addworks/:id',
      component: addartwork,
    },
    {
      name: 'editexhibition',
      path: '/edit/:id',
      component: editexhibition,
    }
  ]
})
