import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StaffView from '@/views/StaffView.vue'
import AthleteLayout from '@/views/AthleteLayout.vue'
import NowView from '@/views/NowView.vue'
import DiaryView from '@/views/DiaryView.vue'
import FoodView from '@/views/FoodView.vue'
import BaseView from '@/views/BaseView.vue'
import BaseSectionView from '@/views/BaseSectionView.vue'
import EtiquetteView from '@/views/EtiquetteView.vue'
import PullupGuideView from '@/views/PullupGuideView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/staff', name: 'staff', component: StaffView },
    {
      path: '/u/:slug',
      component: AthleteLayout,
      children: [
        { path: '', name: 'now', component: NowView },
        { path: 'diary', name: 'diary', component: DiaryView },
        { path: 'food', name: 'food', component: FoodView },
        { path: 'base', name: 'base', component: BaseView },
        { path: 'base/etiquette', name: 'etiquette', component: EtiquetteView },
        { path: 'base/pullups', name: 'pullups', component: PullupGuideView },
        {
          path: 'base/figures',
          name: 'figures',
          component: () => import('@/views/FiguresView.vue'),
        },
        {
          path: 'base/figures/:figureId',
          name: 'figure',
          component: () => import('@/views/FigureDetailView.vue'),
        },
        { path: 'base/s/:section', name: 'base-section', component: BaseSectionView },
      ],
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
