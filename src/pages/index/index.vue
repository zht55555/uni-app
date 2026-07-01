<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBanner, getHomeCategory, getHomeHot, getHomeGoodsGuessLike } from '@/services/home'
import CustomNavbar from './_components/CustomNavbar.vue'
import ZhtSwiper from '@/components/ZhtSwiper.vue'
import HotPanel from '@/components/HotPanel.vue'
import Guess from '@/components/Guess.vue'
import CategoryPanel from './_components/CategoryPanel.vue'
import type { HomeBannerResponse, HomeCategoryResponse, HotResponse } from '@/types/home'
import type { GuessInstance } from '@/types/component'

const homeBannerData = ref<HomeBannerResponse[]>([])
const homeCategoryData = ref<HomeCategoryResponse[]>([])
const homeHotData = ref<HotResponse[]>([])
const guessComponentRef = ref<GuessInstance | null>(null)

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
onLoad(() => {
  getHomeBannerData(1)
  getHomeCategoryData()
  getHomeHotData()
})
</script>

<template>
  <CustomNavbar />
  <scroll-view scroll-y class="scroll-view" @scrolltolower="onScrollToLower">
    <ZhtSwiper :list="homeBannerData" />
    <CategoryPanel :list="homeCategoryData" />
    <HotPanel :list="homeHotData" />
    <Guess ref="guessComponentRef" />
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
