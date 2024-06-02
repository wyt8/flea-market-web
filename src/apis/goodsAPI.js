import httpInstance from '@/utils/http'

const getGoodsList = ({ offset, num, search_input, product_category, price_choice }) => {
  return httpInstance.get('/products', {
    params: {
      offset,
      num,
      search_input,
      product_category,
      price_choice
    }
  })
}

const addGoods = ({
  name,
  price,
  purchase_method,
  product_category,
  inventory,
  description,
  is_anonymous,
  images,
  labels
}) => {
  return httpInstance.post('/products', {
    name,
    price,
    purchase_method,
    product_category,
    inventory,
    description,
    is_anonymous,
    images,
    labels
  })
}

const viewGoods = (product_id) => {
  return httpInstance.get(`/products/${product_id}`)
}

export default {
  getGoodsList,
  addGoods,
  viewGoods
}
