export type HomeBannerResponse = {
  id: string
  imgUrl: string
  hrefUrl: string
  type: number
}

export type HomeCategoryResponse = {
  id: string
  name: string
  icon: string
}

export type HotResponse = {
  alt: string
  /** id */
  id: string
  /** 图片集合[ 图片路径 ] */
  pictures: string[]
  /** 跳转地址 */
  target: string
  /** 标题 */
  title: string
  /** 推荐类型 */
  type: string
}

export type GoodsGuessLikeResponse = {
  desc: string
  /** 商品折扣 */
  discount: number
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品已下单数量 */
  orderNum: number
  /** 商品图片 */
  picture: string
  /** 商品价格 */
  price: number
}
