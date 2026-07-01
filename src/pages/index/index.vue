<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBanner, getHomeCategory, getHomeHot } from '@/services/home'
import CustomNavbar from './_components/CustomNavbar.vue'
import ZhtSwiper from '@/components/ZhtSwiper.vue'
import HotPanel from '@/components/HotPanel.vue'
import CategoryPanel from './_components/CategoryPanel.vue'

import type { HomeBannerResponse, HomeCategoryResponse, HotResponse } from '@/types/home'

const homeBannerData = ref<HomeBannerResponse[]>([])
const homeCategoryData = ref<HomeCategoryResponse[]>([])
const homeHotData = ref<HotResponse[]>([])
const getHomeHotData = async () => {
  try {
    const res = await getHomeHot()
    console.log('homeHotData', res.result)

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
    console.error('获取分类失败:', error)
    homeCategoryData.value = []
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
  <ZhtSwiper :list="homeBannerData" />
  <CategoryPanel :list="homeCategoryData" />
  <HotPanel :list="homeHotData" />
</template>

<style lang="scss">
//
.page {
  background-color: #f7f7f7;
}
</style>
