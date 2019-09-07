const restaurantObj = {
  name: {
    name: 'name',
    title: '餐廳名稱',
    required: true,
    tag: '*',
    htmlInputType: 'text',
    hint: '必填欄位',
    fontAwesome: ''
  },
  name_en: {
    name: 'name_en',
    title: '餐廳英文名稱',
    required: false,
    tag: '',
    htmlInputType: 'text',
    hint: '',
    fontAwesome: '<i class="fas fa-language  mr-2"></i>'
  },
  category: {
    name: 'category',
    title: '類別',
    required: true,
    tag: '*',
    htmlInputType: 'radio',
    hint: '必填欄位',
    fontAwesome: '<i class="fas fa-utensils pr-2 mr-2"></i>'
  },

  image: {
    name: 'image',
    title: '圖片網址',
    required: false,
    tag: '',
    htmlInputType: 'text',
    hint: '必填欄位',
    fontAwesome: '<i class="fas fa-camera-retro mr-2"></i>'
  },
  location: {
    name: 'location',
    title: '地址',
    required: true,
    tag: '*',
    htmlInputType: 'text',
    hint: '必填欄位',
    fontAwesome: '<i class="fas fa-map-marker-alt pr-2 mr-2"></i>'
  },
  phone: {
    name: 'phone',
    title: '電話',
    required: true,
    tag: '*',
    htmlInputType: 'text',
    hint: '必填欄位',
    fontAwesome: '<i class="fas fa-mobile-alt pr-2 mr-2"></i>'
  },
  google_map: {
    name: 'google_map',
    title: 'Google Map',
    required: false,
    tag: '',
    htmlInputType: 'text',
    hint: '',
    fontAwesome: '<i class="fas fa-map-marker-alt pr-2 mr-2"></i>'
  },
  rating: {
    name: 'rating',
    title: '評價',
    required: false,
    tag: '',
    htmlInputType: 'text',
    hint: '',
    fontAwesome: '<i class="fas fa-star fa-xs mr-2"></i>'
  },
  description: {
    name: 'description',
    title: '餐廳描述',
    required: false,
    tag: '*',
    htmlInputType: 'text',
    hint: '必填欄位',
    fontAwesome: '<i class="fas fa-pencil-alt mr-2"></i>'
  },
}
module.exports = restaurantObj