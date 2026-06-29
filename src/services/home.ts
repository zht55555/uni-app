import { http } from '@/utils/request'
import type { HomeBannerResponse } from '@/types/home'

export const getHomeBanner = (distributionSite: number) => {
  return http<HomeBannerResponse[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}
