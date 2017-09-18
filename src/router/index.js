import Vue from 'vue'
import Router from 'vue-router'
import Bulletin from '@/components/Bulletin/Bulletin.vue'
import PostBuilder from '@/components/PostBuilder/PostBuilder.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bulletin',
      component: Bulletin
    },
    {
      path: '/post/create',
      name: 'Create Post',
      component: PostBuilder
    },
    {
      path: '/post/edit/:postId',
      name: 'Edit Post',
      component: PostBuilder
    }
  ]
})
