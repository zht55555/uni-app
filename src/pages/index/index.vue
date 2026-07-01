<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBanner, getHomeCategory, getHomeHot, getHomeGoodsGuessLike } from '@/services/home'
import CustomNavbar from './_components/CustomNavbar.vue'
import ZhtSwiper from '@/components/ZhtSwiper.vue'
import Guess from '@/components/Guess.vue'
import CategoryPanel from './_components/CategoryPanel.vue'
import HotPanel from './_components/HotPanel.vue'
import PageSkeleton from './_components/PageSkeleton.vue'
import type { HomeBannerResponse, HomeCategoryResponse, HotResponse } from '@/types/home'
import type { GuessInstance } from '@/types/component'

const homeBannerData = ref<HomeBannerResponse[]>([])
const homeCategoryData = ref<HomeCategoryResponse[]>([])
const homeHotData = ref<HotResponse[]>([])
const guessComponentRef = ref<GuessInstance | null>(null)
const refresherTriggered = ref(false)
const isLoading = ref(true)

const getHomeHotData = async () => {
  try {
    const res = await getHomeHot()

    homeHotData.value = res.result
  } catch (error) {
    homeHotData.value = []
  }
}
const getHomeBannerData = async (distributionSite: number) => {
  try {
    const res = await getHomeBanner(distributionSite)
    homeBannerData.value = res.result
  } catch (error) {
    homeBannerData.value = []
  }
}
const getHomeCategoryData = async () => {
  try {
    const res = await getHomeCategory()
    homeCategoryData.value = res.result
  } catch (error) {
    homeCategoryData.value = []
  }
}
const onScrollToLower = () => {
  if (guessComponentRef.value) {
    guessComponentRef.value.getMore()
  }
}
const onRefresherRefresh = async () => {
  guessComponentRef.value?.resetPageParams()
  refresherTriggered.value = true
  Promise.all([
    getHomeBannerData(1),
    getHomeCategoryData(),
    getHomeHotData(),
    guessComponentRef.value?.getMore(),
  ]).finally(() => {
    refresherTriggered.value = false
  })
}
onLoad(() => {
  Promise.all([getHomeBannerData(1), getHomeCategoryData(), getHomeHotData()]).finally(() => {
    isLoading.value = false
  })
})
</script>

<template>
  <CustomNavbar />
  <scroll-view
    scroll-y
    class="scroll-view"
    @scrolltolower="onScrollToLower"
    refresher-enabled
    @refresherrefresh="onRefresherRefresh"
    :refresher-triggered="refresherTriggered"
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <ZhtSwiper :list="homeBannerData" />
      <CategoryPanel :list="homeCategoryData" />
      <HotPanel :list="homeHotData" />
      <Guess ref="guessComponentRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  height: 100%;
}
scroll-view {
  flex: 1;
}
</style>
