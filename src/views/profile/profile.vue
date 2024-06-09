<script setup>
import { useUserStore } from '@/stores/user'
import { getuserinfo, updateinfo, updateavatar } from '@/apis/update'
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

const userStore = useUserStore()
const form = ref({
  name: '',
  avatar_url: '',
  gender: '',
  contact_info: '',
  personal_signature: ''
})

const getinfo = async () => {
  const res = await getuserinfo(userStore.userInfo.user_id)
  form.value = res.data
}
let submitted = false
onMounted(() => {
  getinfo()
})
// export default {
//   name: 'ProfileForm',
//   data() {
//     const userStore = useUserStore()
//     console.log(userStore.userInfo)
//     const form = ref({
//       name: userStore.userInfo.user_id,
//       avatar_url: '',
//       gender: '',
//       contact_info: '',
//       personal_signature: ''
//     })
//     return {
//       form,
//       submitted: false,
//       userStore
//     }
//   },
//   created() {
//     this.getinfo()
//   },
//   methods: {
// async getinfo() {
//   const res = getuserinfo(this.userStore.userInfo.user_id)
//   console.log(res)
//   this.form.value = res.data
//   console.log(this.form.value)
// },
// const  handleFileChange = async (event) => {
//   const file = event.target.files[0]
//   if (file) {
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       this.form.value.avatar_url = e.target.result
//     }
//     reader.readAsDataURL(file)
//     const res = await updateavatar(user_id, this.form.avatar_url)
//   }
// }
const handleSubmit = async () => {
  submitted = true
  // 这里可以添加其他处理逻辑，例如发送数据到服务器
  const res = await updateinfo(userStore.userInfo.user_id, form.value)
  if (res.code === 0) {
    MessagePlugin.success('修改成功')
    userStore.userInfo.name = form.value.name
    userStore.userInfo.avatar_url = form.value.avatar_url
  }
}
const handleFileChange = async (event) => {
  // if (props.type === 'image' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
  //   MessagePlugin.error('图片格式必须是jpg或png')
  //   return false
  // } else if (props.type === 'vedio' && rawFile.type !== 'video/mp4') {
  //   MessagePlugin.error('视频格式必须是mp4')
  //   return false
  // }

  // if (props.type === 'image' && rawFile.size / 1024 / 1024 > 5) {
  //   MessagePlugin.error('图片大小必须小于5MB')
  //   return false
  // } else if (props.type === 'vedio' && rawFile.size / 1024 / 1024 > 100) {
  //   MessagePlugin.error('视频大小必须小于100MB')
  //   return false
  // }
  const file = event.target.files[0]
  console.log(file)
  const res = await updateavatar(userStore.userInfo.user_id, file)
  if (res.code === 0) {
    MessagePlugin.success('上传图像成功')
    form.value.avatar_url = res.data
  } else {
    MessagePlugin.error('上传图像失败')
  }
}
</script>

<template>
  <div class="profile-form">
    <h1>个人信息表</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group avatar-group">
        <img v-if="form.avatar_url" :src="form.avatar_url" alt="avatar" class="avatar-preview" />
        <input type="file" @change="handleFileChange" accept="image/jpeg,image/png" />
        <div v-if="fileError" class="error-message">{{ fileError }}</div>
      </div>

      <div class="form-group">
        <label for="name">姓名: </label>
        <input type="text" id="name" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label for="gender">性别:</label>
        <select id="gender" v-model="form.gender" required>
          <option value="male">男</option>
          <option value="female">女</option>
          <option value="other">其他</option>
        </select>
      </div>

      <div class="form-group">
        <label for="contact_info">联系方式:</label>
        <input type="text" id="contact_info" v-model="form.contact_info" required />
      </div>

      <div class="form-group">
        <label for="personal_signature">个人签名:</label>
        <input type="text" id="personal_signature" v-model="form.personal_signature" required />
      </div>

      <button type="submit">提交</button>
    </form>

    <div v-if="submitted">
      <h2>提交的信息:</h2>
      <ul>
        <li v-if="form.avatar_url">
          <strong>头像:</strong> <img :src="form.avatar_url" alt="avatar" class="avatar-preview" />
        </li>
        <li><strong>姓名:</strong> {{ form.name }}</li>
        <li><strong>性别:</strong> {{ form.gender }}</li>
        <li><strong>联系方式:</strong> {{ form.contact_info }}</li>
        <li><strong>个人签名:</strong> {{ form.personal_signature }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.profile-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.avatar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.submitted-info {
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}
</style>
