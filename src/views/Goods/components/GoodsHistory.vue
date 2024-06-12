<template>
  <div>
    <main>
      <div class="product-history">
        <h1>发布商品历史</h1>
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <ul v-if="products">
          <li v-for="product in products" :key="product.name" class="product-item">
            <img :src="product.cover_image_url" alt="Product Image" class="product-image" />
            <t-descriptions
              title="商品信息"
              layout="vertical"
              item-layout="horizontal"
              size="small"
              :column="2"
            >
              <t-descriptions-item label="商品名">{{ product.name }}</t-descriptions-item>
              <t-descriptions-item label="价格"
                >{{ (product.price / 1.0).toFixed(2) }} 元</t-descriptions-item
              >
              <t-descriptions-item label="种类">{{ product.product_category }}</t-descriptions-item>
              <t-descriptions-item label="购买方式">{{
                product.purchase_method
              }}</t-descriptions-item>
              <t-descriptions-item label="发布时间">{{ product.created_time }}</t-descriptions-item>
              <t-descriptions-item label="修改时间">{{ product.updated_time }}</t-descriptions-item>
            </t-descriptions>
            <div class="btn-container" v-if="product.status === 'on-sale'">
              <t-button variant="outline" theme="default" @click="edit(product.product_id)"
                >修改信息</t-button
              >
              <t-button theme="success" @click="soldOut(product.product_id)">下架商品</t-button>
            </div>
            <div class="sold-out" v-else>已下架</div>
          </li>
        </ul>
      </div>
    </main>
  </div>
  <GoodsEdit
    v-if="isModelvisible"
    @close="isModelvisible = false"
    :product_id="now_product_id"
  ></GoodsEdit>
</template>

<script>
import { getgoodshistory } from '@/apis/goodshistory' // 确保路径正确
import { useUserStore } from '@/stores/user'
import GoodsEdit from './edit.vue'
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import goodsAPI from '@/apis/goodsAPI'

export default {
  components: {
    GoodsEdit
  },
  data() {
    return {
      loading: true,
      error: null,
      products: [],
      userStore: useUserStore(),
      isModelvisible: false,
      goodsNewRef: null,
      name: '',
      price: '',
      purchase_method: '',
      product_category: '',
      status: false,
      image: [],
      now_product_id: 0
    }
  },
  methods: {
    edit(product_id) {
      this.now_product_id = product_id
      this.isModelvisible = true
    },
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
    },
    soldOut(product_id) {
      const confirmDialog = DialogPlugin.confirm({
        header: '是否下架商品？',
        body: '该操作不可逆，下架后不能重新上架！',
        theme: 'warning',
        onConfirm: async () => {
          const res = await goodsAPI.soldOutGoods(product_id)
          if (res.code === 0) {
            MessagePlugin.success('下架商品成功!')
            window.setTimeout(() => {
              window.location.reload()
            }, 1000)
          } else {
            MessagePlugin.error(res.msg)
          }
          confirmDialog.hide()
        }
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
  padding: 15px 25px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  gap: 40px;
}

.btn-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-left: 30px;
}

.sold-out {
  color: green;
  font-weight: bold;
  font-size: 30px;
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
  margin-left: 30px;
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
.styled-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s,
    transform 0.1s;
}

.styled-button:hover {
  background-color: #45a049;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.styled-button:active {
  background-color: #3e8e41;
  transform: scale(0.98);
}
</style>
