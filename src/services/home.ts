import { http } from '@/utils/request'
import type { HomeBannerResponse, HomeCategoryResponse } from '@/types/home'

export const getHomeBanner = (distributionSite: number) => {
  return http<HomeBannerResponse[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}

export const getHomeCategory = () => {
  return http<HomeCategoryResponse[]>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}
