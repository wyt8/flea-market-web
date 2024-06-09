<script setup>
import { ref, onMounted, computed } from 'vue'
import router from '@/router/index'
import goodsAPI from '@/apis/goodsAPI'
import chatAPI from '@/apis/chatAPI'
import { useUserStore } from '@/stores/user'
import { MessagePlugin } from 'tdesign-vue-next'
import { CloseIcon } from 'tdesign-icons-vue-next'

const userStore = useUserStore()

const props = defineProps({
  product_id: { type: Number, required: true }
})

const productData = ref({
  name: '',
  price: 0,
  purchase_method: '',
  product_categroy: '',
  publisher: {
    user_id: 0,
    avatar_url: '',
    name: ''
  },
  inventroy: 1,
  description: '',
  created_time: '',
  updated_time: '',
  images: [
    {
      imageUrl: ''
    }
  ],
  labels: [
    {
      name: ''
    }
  ]
})

const viewGoods = async () => {
  const res = await goodsAPI.viewGoods(props.product_id)
  productData.value = res.data

  const a =
    productData.value.publisher.user_id === userStore.userInfo.user_id ||
    productData.value.publisher.user_id === -1

  console.log(a)
}

onMounted(() => {
  viewGoods()
})

// 轮播图查看图片的当前下标
const imageIndex = ref(0)

const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}

const images = computed(() => {
  let res = []
  productData.value.images.forEach((item) => {
    res.push(item.imageUrl)
  })
  return res
})

const sendMessageHandle = async () => {
  if (userStore.userInfo.token && userStore.userInfo.token.length !== 0) {
    const res = await chatAPI.sendmessage(productData.value.publisher.user_id, 'hello')
    router.push({ name: 'message' })
  } else {
    MessagePlugin.warning('请先登录')
  }
}
</script>

<template>
  <!-- 浏览商品的模态框 -->
  <div class="view-container">
    <!-- 左边图片展示区 -->
    <div class="left-container">
      <swiper-container
        id="swiper"
        :navigation="true"
        :pagination="true"
        pagination-type="fraction"
        :scrollbar-hide="true"
        :loop="true"
        :keyboard="true"
        :mousewheel="true"
        :activeInedx="1"
      >
        <t-image-viewer :images="images" v-model:index="imageIndex">
          <template #trigger="{ open }">
            <swiper-slide v-for="(item, index) in productData.images" :key="index">
              <t-image
                @click="open"
                :src="item.imageUrl"
                :preview-src-list="images"
                :preview-teleported="true"
                fit="contain"
                class="swiper-img"
                :initial-index="1"
              ></t-image>
            </swiper-slide>
          </template>
        </t-image-viewer>
      </swiper-container>
    </div>

    <!-- 右边内容展示区 -->
    <div class="right-container">
      <div class="header-row">
        <a href="javascript:;" class="author">
          <img :src="productData.publisher.avatar_url" class="avatar" />
          <span>{{ productData.publisher.name }}</span>
        </a>
        <t-button shape="circle" variant="outline" @click="close"><CloseIcon /></t-button>
      </div>

      <div class="main-wrapper">
        <div class="main main-wrapper">
          <!-- 标题 -->
          <h3>{{ productData.name }}</h3>
          <!-- 价格 -->
          <div class="price">￥ {{ (productData.price / 1).toFixed(2) }}</div>
          <!-- 标签 -->
          <div class="tag-container">
            <t-tag
              shape="round"
              theme="warning"
              v-for="(item, index) in productData.labels"
              :key="index"
              >{{ item.name }}</t-tag
            >
          </div>
          <!-- 描述 -->
          <p v-for="(item, index) in productData.description.split('\n')" :key="index">
            {{ item }}
          </p>

          <t-divider></t-divider>
          <div class="detail">
            <t-descriptions
              title="详情信息"
              bordered
              layout="vertical"
              item-layout="horizontal"
              :column="2"
            >
              <t-descriptions-item label="取货方式">{{
                productData.purchase_method
              }}</t-descriptions-item>
              <t-descriptions-item label="商品种类">{{
                productData.product_categroy
              }}</t-descriptions-item>
              <t-descriptions-item label="剩余商品数量">{{
                productData.inventroy
              }}</t-descriptions-item>
              <t-descriptions-item label="发布时间">{{
                productData.created_time
              }}</t-descriptions-item>
              <t-descriptions-item label="上次修改时间">{{
                productData.updated_time
              }}</t-descriptions-item>
            </t-descriptions>
          </div>

          <t-divider></t-divider>
          <t-button
            block
            shape="round"
            variant="outline"
            @click="sendMessageHandle"
            :disabled="
              productData.publisher.user_id === userStore.userInfo.user_id ||
              productData.publisher.user_id === -1
            "
            >立即聊天</t-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view-container {
  box-sizing: border-box;
  height: 90vh;
  min-height: 400px;
  max-height: 1200px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  overflow: hidden;
  max-width: 90vw;

  .left-container {
    flex: 1;
    min-width: 450px;
    max-width: 650px;
    height: 100%;

    swiper-container {
      width: 100%;
      height: 100%;

      .swiper-img {
        width: 100%;
        height: 100%;
        background-color: #eee;
      }
    }
  }

  .right-container {
    width: 450px;
    min-width: 35%;
    height: 100%;
    background-color: #fff;
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      border-bottom: 1px solid #ccc;
      padding: 0 20px;
      position: sticky;
      top: 0;
      z-index: 100;

      .author {
        font-size: 15px;
        text-decoration: none;
        color: #333;
        transition: all 0.5s;

        &:hover {
          color: #999;
        }

        .avatar {
          height: 40px;
          width: 40px;
          border-radius: 20px;
          margin-right: 5px;
          vertical-align: middle;
        }
      }

      .follow-btn {
        background-color: red;
        width: 60px;
        height: 30px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        color: white;
        font-weight: 600;
      }

      .return-btn {
        background-color: transparent;
        border: none;
        width: 30px;
        height: 30px;
        cursor: pointer;
        color: skyblue;

        .iconfont {
          font-size: 30px;
        }
      }
    }

    .main-wrapper {
      height: calc(100% - 60px);
      overflow: auto;
    }

    .main {
      padding: 20px 20px;
      box-sizing: border-box;
      height: 100%;

      h3 {
        margin: 0 0 10px;
        font-size: 20px;
        font-weight: 600;
        line-height: 2;
        letter-spacing: 0.1em;
        text-align: center;
      }

      .price {
        font-size: 30px;
        color: red;
        font-weight: bold;
        text-align: right;
      }

      .tag-container {
        display: flex;
        flex-wrap: wrap;
        gap: 5px 10px;
        padding: 20px 10px;
      }

      p {
        font-weight: 500;
        text-indent: 2em;
        line-height: 1.6;
        letter-spacing: 0.05em;
      }

      .detail {
        margin: 30px 0;
      }
    }
  }
}
</style>
