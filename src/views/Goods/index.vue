<script setup>
import GoodsCard from './components/GoodsCard.vue'
import GoodsNew from './components/GoodsNew.vue'
import GoodsView from './components/GoodsView.vue'
import { AddIcon } from 'tdesign-icons-vue-next'
import goodsAPI from '@/apis/goodsAPI'
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
// 引入模态框组件
import { VueFinalModal } from 'vue-final-modal'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const pageSizeOptions = [
  { label: '每页 8 条', value: 8 },
  { label: '每页 12 条', value: 12 },
  { label: '每页 16 条', value: 16 },
  { label: '每页 20 条', value: 20 }
]

const totalGoodsNum = ref(0)
const goodsList = ref([])
const params = ref({
  offset: 0,
  num: 8,
  search_input: '',
  product_category: '全部',
  price_choice: 0
})
const getGoodsList = async () => {
  const res = await goodsAPI.getGoodsList(params.value)
  // if (res.code === 0) {
  goodsList.value = res.data.products
  totalGoodsNum.value = res.data.total_num
  const goodsListLen = goodsList.value.length
  if (goodsListLen > 0) {
    params.value.last_product_id = goodsList.value[goodsListLen - 1].product_id
  }
  // }
}

onMounted(async () => {
  await getGoodsList()
})

const product_category_options = ref([
  { label: '电子电脑', value: '电子电脑' },
  { label: '游戏影视', value: '游戏影视' },
  { label: '衣包饰品', value: '衣包饰品' },
  { label: '体育休闲', value: '体育休闲' },
  { label: '学习办公', value: '学习办公' },
  { label: '食品饮料', value: '食品饮料' },
  { label: '其他', value: '其他' }
])

const onReset = () => {
  params.value.search_input = ''
  params.value.product_category = '全部'
  params.value.price_choice = 0
}

const searchHandle = async () => {
  params.value.offset = 0
  current.value = 1
  await getGoodsList()
}

const current = ref(1) // 当前页号

const onPageSizeChange = async (size) => {
  params.value.offset = 0
  params.value.num = size
  current.value = 1
  await getGoodsList()
}

const onCurrentChange = async (index, pageInfo) => {
  params.value.offset = (index - 1) * params.value.num
  current.value = index
  await getGoodsList()
}

// 模态框相关部分
const isModelOpen = ref(false)
const modelConfig = ref({
  teleportTo: 'body',
  modelValue: false,
  displayDirective: 'if',
  hideOverlay: false,
  overlayTransition: 'vfm-fade',
  contentTransition: 'vfm-fade',
  clickToClose: true,
  escToClose: true,
  background: 'non-interactive',
  lockScroll: true,
  reserveScrollBarGap: true,
  swipeToClose: 'none'
})

const modelType = ref('') // 模态框的类型
const viewProductId = ref(1) // 要查看product的id
const viewModel = (momentid) => {
  modelType.value = 'view'
  viewProductId.value = momentid
  isModelOpen.value = true
}

const closeModel = () => {
  isModelOpen.value = false
}

const isModelvisible = ref(false)
const addGoods = () => {
  if (userStore.userInfo.token && userStore.userInfo.token.length !== 0) {
    modelType.value = 'add'
    isModelvisible.value = true
  } else {
    MessagePlugin.warning('请先登录')
  }
}
</script>

<template>
  <!-- 发布商品模态框 -->
  <GoodsNew v-if="isModelvisible" @close="isModelvisible = false"></GoodsNew>
  <!-- 查看商品详细信息模态框 -->
  <VueFinalModal
    v-model="isModelOpen"
    class="modal-container"
    contentClass="modal-container-content"
    :overlay-transition="modelConfig.overlayTransition"
    :content-transition="modelConfig.contentTransition"
    :showSwipeBanner="true"
    @closed="closeModel"
  >
    <GoodsView
      :product_id="viewProductId"
      v-if="modelType === 'view'"
      @close="closeModel"
    ></GoodsView>
  </VueFinalModal>

  <main>
    <div class="search-container">
      <div class="header">商品浏览</div>
      <t-form reset-type="initial">
        <t-form-item label="商品名称" name="search_input">
          <t-space size="large">
            <t-input v-model="params.search_input" placeholder="请输入内容"></t-input>
            <t-radio-group v-model="params.price_choice">
              <t-radio value="1">10元以下</t-radio>
              <t-radio value="2">10-20元</t-radio>
              <t-radio value="3">30元以上</t-radio>
            </t-radio-group>
          </t-space>
        </t-form-item>

        <t-form-item label="商品种类" name="product_category">
          <t-space size="large">
            <t-select v-model="params.product_category" clearable filterable>
              <t-option
                v-for="(item, index) in product_category_options"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </t-option>
            </t-select>
            <t-button theme="primary" @click="searchHandle">搜索</t-button>
            <t-button theme="default" variant="base" @click="onReset">重置</t-button>
          </t-space>
        </t-form-item>
      </t-form>
    </div>

    <div class="content">
      <div class="cards-container">
        <GoodsCard
          v-for="(item, index) in goodsList"
          v-bind:key="index"
          :cover_image_url="item.cover_image_url"
          :name="item.name"
          :price="item.price"
          :date="item.updated_time"
          :product_id="item.product_id"
          @click="viewModel(item.product_id)"
        ></GoodsCard>
      </div>

      <div class="pagination">
        <t-pagination
          class="inner-pagination"
          v-model="current"
          v-model:pageSize="params.num"
          :total="totalGoodsNum"
          :maxPageBtn="7"
          :page-size-options="pageSizeOptions"
          @page-size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </div>
  </main>

  <t-sticky-tool
    :style="{ position: 'fixed', overflow: 'hidden' }"
    shape="round"
    :offset="[50, 120]"
    :onClick="addGoods"
  >
    <t-sticky-item label="发布"
      ><template #icon><AddIcon /></template>
    </t-sticky-item>
  </t-sticky-tool>
</template>
<style scoped lang="scss">
main {
  max-width: 1200px;
  margin: 50px auto;

  .content {
    margin-top: 40px;
    background-color: white;
    border-radius: 20px;
    padding: 50px 20px;
  }
}

.cards-container {
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px 30px;
  cursor: pointer;
}

.pagination {
  display: flex;
  flex-direction: row-reverse;

  .inner-pagination {
    max-width: 600px;
  }
}

.search-container {
  background-color: white;
  padding: 10px 70px 50px;
  border-radius: 20px;

  .header {
    margin: 20px 0;
    font-size: 40px;
    line-height: 1.8;
    font-weight: bold;
    color: orange;
  }
}
</style>
