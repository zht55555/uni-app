<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBanner, getHomeCategory } from '@/services/home'
import CustomNavbar from './_components/CustomNavbar.vue'
import ZhtSwiper from '@/components/ZhtSwiper.vue'
import CategoryPanel from './_components/CategoryPanel.vue'
import type { HomeBannerResponse, HomeCategoryResponse } from '@/types/home'

const homeBannerData = ref<HomeBannerResponse[]>([])
const homeCategoryData = ref<HomeCategoryResponse[]>([])
const getHomeBannerData = async (distributionSite: number) => {
  try {
    const res = await getHomeBanner(distributionSite)
    console.log('res', res)
    homeBannerData.value = res.result
  } catch (error) {
    console.error('获取轮播图失败:', error)
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
})
</script>

<template>
  <CustomNavbar />
  <ZhtSwiper :list="homeBannerData" />
  <CategoryPanel :list="homeCategoryData" />
</template>

<style lang="scss">
//
.page {
  background-color: #f7f7f7;
}
</style>
