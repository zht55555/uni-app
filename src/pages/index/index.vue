<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBanner } from '@/services/home'
import CustomNavbar from './_components/CustomNavbar.vue'
import ZhtSwiper from '@/components/ZhtSwiper.vue'
import type { HomeBannerResponse } from '@/types/home'

const homeBannerData = ref<HomeBannerResponse[]>([])
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
onLoad(() => {
  getHomeBannerData(1)
})
</script>

<template>
  <CustomNavbar />
  <ZhtSwiper :list="homeBannerData" />
</template>

<style lang="scss">
//
</style>
