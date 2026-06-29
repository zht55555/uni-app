/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import ZhtSwiper from '@/components/ZhtSwiper.vue'
declare module 'vue' {
  export interface GlobalComponents {
    //
    ZhtSwiper: typeof ZhtSwiper
  }
}
