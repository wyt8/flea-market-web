<script setup>
import { ref, onMounted } from 'vue'
// import momentAPI from '@/apis/momentAPI'
import uploadAPI from '@/apis/uploadAPI'
import goodsAPI from '@/apis/goodsAPI'
import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next'

const props = defineProps({
  type: {
    type: String,
    default: 'image'
  },
  formname: {
    type: String
  },
  formimage: {
    type: String
  },
  formprice: {
    type: String
  },
  formpurchase_method: {
    type: String
  },
  formproduct_category: {
    type: String
  },
  formstatus: {
    type: String
  },
  product_id: {
    type: Number,
    default: 77
  }
})
const emit = defineEmits(['close'])

const media = ref([])
const mediaAction = ref('')
// 上传文件前的校验
const beforeUpload = async (rawFile) => {
  // 文件扩展名
  const fileExt = rawFile.name.split('.')[rawFile.name.split('.').length - 1]
  if (props.type === 'image' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    MessagePlugin.error('图片格式必须是jpg或png')
    return false
  } else if (props.type === 'vedio' && rawFile.type !== 'video/mp4') {
    MessagePlugin.error('视频格式必须是mp4')
    return false
  }

  if (props.type === 'image' && rawFile.size / 1024 / 1024 > 5) {
    MessagePlugin.error('图片大小必须小于5MB')
    return false
  } else if (props.type === 'vedio' && rawFile.size / 1024 / 1024 > 100) {
    MessagePlugin.error('视频大小必须小于100MB')
    return false
  }
  return true
}

const formData = ref({
  name: '',
  price: 0,
  purchase_method: '自行协商',
  product_category: '学习办公',
  inventory: 1,
  description: '',
  is_anonymous: false,
  labels: [],
  images: []
})

const httpRequest = async (files) => {
  console.log(files)
  console.log(files[0])
  const res = await uploadAPI.uploadImg(files[0].raw)
  if (res.code === 0) {
    media.value.push(res.data)
    return { status: 'success', response: { url: res.data } }
  } else {
    return { status: 'fail', error: '上传失败' }
  }
}

const modGoods = async () => {
  if (formData.value.name.length === 0 || formData.value.description.length === 0) {
    MessagePlugin.warning({ content: '标题和内容不能为空', duration: 1000 })
    return
  }
  if (media.value.length === 0) {
    MessagePlugin.warning({ content: '至少上传一张图片', duration: 1000 })
    return
  } else {
    media.value.forEach((item) => {
      formData.value.images.push(item)
    })
  }

  for (let item of purchase_method_options.value) {
    if (item.label === formData.value.purchase_method) {
      formData.value.purchase_method = item.value
      break
    }
  }

  const res = await goodsAPI.modGoods(props.product_id, formData.value)
  if (res.code === 0) {
    MessagePlugin.success({ content: '修改成功', duration: 1000 })
    visible.value = false
    window.setTimeout(() => {
      window.location.reload()
    }, 1000)
  } else {
    MessagePlugin.error({ content: res.msg, duration: 1000 })
  }
}

const visible = ref(true)
const close = () => {
  // if (
  //   !confirmClose.value &&
  //   (newMoment.value.title.length !== 0 ||
  //     newMoment.value.content.length !== 0 ||
  //     media.value.length !== 0)
  // ) {
  //   // MessagePlugin.warning({ content: '您所做的更改不会被保存，请再次确认', duration: 1000 })
  //   // confirmClose.value = true
  // } else {
  //   // console.log('185713yuhsagfbhjds')
  //   visible.value = false
  //   emit('close')
  // }
  visible.value = false
  emit('close')
}

const handleFail = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`)
}

const handleSuccess = ({ file }) => {
  MessagePlugin.success(`文件 ${file.name} 上传成功`)
}

const purchase_method_options = ref([
  { label: '上门取货', value: 'pickup' },
  { label: '快递', value: 'express' },
  { label: '自行协商', value: 'self-negotiated' }
])

const product_category_options = ref([
  { label: '电子电脑', value: '电子电脑' },
  { label: '游戏影视', value: '游戏影视' },
  { label: '衣包饰品', value: '衣包饰品' },
  { label: '体育休闲', value: '体育休闲' },
  { label: '学习办公', value: '学习办公' },
  { label: '食品饮料', value: '食品饮料' },
  { label: '其他', value: '其他' }
])

const img_list = ref([])

const getProductInfo = async () => {
  const res = await goodsAPI.viewGoods(props.product_id)
  if (res.code === 0) {
    formData.value.name = res.data.name
    formData.value.price = res.data.price
    formData.value.product_categroy = res.data.product_categroy
    formData.value.inventory = res.data.inventroy
    formData.value.description = res.data.description
    formData.value.is_anonymous = res.data.is_anonymous
    for (let item of res.data.images) {
      img_list.value.push({ url: item.imageUrl, status: 'success', type: 'image/*', percent: 100 })
    }
    console.log(img_list.value)
  }
}

onMounted(() => {
  getProductInfo()
})
</script>

<template>
  <t-dialog
    :closeBtn="true"
    @close="close"
    placement="center"
    v-model:visible="visible"
    header="修改商品信息"
    :cancelBtn="null"
    :confirmOnEnter="true"
    width="600px"
    destroyOnClose
    :defaultFiles="img_list"
  >
    <div class="new-container">
      <div class="media-container">
        <t-upload
          theme="image"
          accept="image/*"
          :beforeUpload="beforeUpload"
          :show-image-file-name="false"
          :requestMethod="httpRequest"
          multiple
          :max="9"
          tips="最多可以选择9张图片"
          @fail="handleFail"
          @success="handleSuccess"
        ></t-upload>
      </div>

      <div class="content">
        <t-form :data="formData" :label-width="60">
          <t-form-item label="商品名称" name="name">
            <t-input v-model="formData.name"></t-input>
          </t-form-item>
          <t-form-item label="商品价格" name="price">
            <t-input-number
              v-model="formData.price"
              :max="10000"
              :min="0"
              :step="1"
              :decimal-places="2"
              suffix="元"
              :autoWidth="true"
            />
          </t-form-item>
          <t-form-item label="取货方式" name="purchase_method">
            <t-select v-model="formData.purchase_method" clearable filterable>
              <t-option
                v-for="(item, index) in purchase_method_options"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="商品种类" name="product_category">
            <t-select v-model="formData.product_category" clearable filterable>
              <t-option
                v-for="(item, index) in product_category_options"
                :key="index"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="商品数量" name="inventory">
            <t-input-number
              v-model="formData.inventory"
              :max="100"
              :min="1"
              :step="1"
              :decimal-places="0"
              suffix="个"
              :autoWidth="true"
            />
          </t-form-item>
          <t-form-item label="商品描述" name="descirption">
            <t-textarea
              v-model="formData.description"
              :autosize="{ minRows: 3, maxRows: 5 }"
              :maxlength="200"
            />
          </t-form-item>
          <t-form-item label="匿名" name="is_anonymous">
            <t-switch v-model="formData.is_anonymous"></t-switch>
          </t-form-item>
        </t-form>
      </div>
    </div>

    <template #confirmBtn>
      <div class="submit-btn">
        <t-button block shape="round" size="large" @click="modGoods">修改</t-button>
      </div>
    </template>
  </t-dialog>
</template>

<style scoped lang="scss">
.new-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .media-container {
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 10px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
