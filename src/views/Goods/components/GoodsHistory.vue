<template>
  <div class="product-history">
    <h1>发布商品历史</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="products">
      <li v-for="product in products" :key="product.name" class="product-item">
        <img :src="product.cover_image_url" alt="Product Image" class="product-image" />
        <div class="product-details">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-price">价格: {{ product.price }}</p>
          <p class="product-method">购买方式: {{ product.purchase_method }}</p>
          <p class="product-category">种类: {{ product.product_category }}</p>
          <p class="product-time">发布时间: {{ product.created_time }}</p>
          <p class="product-updated">修改时间: {{ product.updated_time }}</p>
          <p class="product-status">状态: {{ product.status }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getgoodshistory } from '@/apis/goodshistory' // 确保路径正确
import { useUserStore } from '@/stores/user'
export default {
  data() {
    return {
      loading: true,
      error: null,
      products: [],
      userStore: useUserStore()
    }
  },
  methods: {
    fetchProductHistory() {
      const userId = this.userStore.userInfo.user_id // Replace with dynamic user ID if necessary

      getgoodshistory(userId)
        .then((response) => {
          console.log(response.data) // 查看 API 返回的数据
          this.products = response.data.products
        })
        .catch((error) => {
          this.error = 'Failed to fetch product history'
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  mounted() {
    this.fetchProductHistory()
  }
}
</script>

<style scoped>
.product-history {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.loading,
.error {
  text-align: center;
  color: #ff0000;
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

.product-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
}

.product-details {
  flex: 1;
}

.product-name {
  font-size: 1.5em;
  margin: 0;
  color: #333;
}

.product-price,
.product-method,
.product-category,
.product-time,
.product-updated,
.product-status {
  margin: 5px 0;
  color: #666;
}
</style>
