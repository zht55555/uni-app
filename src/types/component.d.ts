/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import ZhtSwiper from '@/components/ZhtSwiper.vue'
import Guess from '@/components/Guess.vue'
declare module 'vue' {
  export interface GlobalComponents {
    //
    ZhtSwiper: typeof ZhtSwiper
    Guess: typeof Guess
  }
}

export type GuessInstance = InstanceType<typeof Guess>
