// src/types/components.d.ts
import Swiper from './Swiper.vue'
declare module 'vue' {
  export interface GlobalComponents {
    Swiper: typeof Swiper
  }
}
