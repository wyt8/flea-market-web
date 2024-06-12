<template>
  <div class="chat-app">
    <div class="chat-container">
      <div class="chat-sidebar">
        <h3>Friends</h3>
        <ul class="friend-list">
          <li
            v-for="friend in friends"
            :key="friend.id"
            @click="selectFriend(friend)"
            :class="{ selected: friend.user_id === selectedFriend.user_id }"
          >
            <img :src="friend.avatar_url" alt="avatar" class="avatar" />
            {{ friend.name }}
          </li>
        </ul>
      </div>
      <div class="chat-main">
        <div class="chat-header">
          <h2>Chat Room - {{ selectedFriend.name }}</h2>
        </div>
        <div class="chat-messages" ref="messages">
          <div
            v-for="message in messages"
            :key="message.message_id"
            :class="[
              'chat-message',
              { sent: message.fromId === selectedFriend.user_id ? false : true }
            ]"
          >
            <div class="message-content">
              <img
                :src="
                  message.fromId === selectedFriend.user_id
                    ? selectedFriend.avatar_url
                    : userStore.userInfo.avatar_url
                "
                alt="avatar"
                class="avatar"
                :class="{
                  'avatar-right': message.from_user_id == selectedFriend.user_id ? false : true
                }"
              />
              <div class="message-text">
                <span>{{ message.content }}</span>
                <span class="timestamp">{{ formatTimestamp(message.createTime) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message" />
          <button @click="sendMessage" :disabled="isDisabled">
            <img src="@/assets/imgs/logo.png" alt="Send" class="send-icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFriendsList } from '@/apis/friendAPI'
import { getChatHistory } from '@/apis/chatAPI'
import chatAPI from '@/apis/chatAPI'
import { useUserStore } from '@/stores/user'
import { MessagePlugin } from 'tdesign-vue-next'
export default {
  name: 'Chat',
  data() {
    return {
      userStore: useUserStore(),
      friends: [],
      selectedFriend: {},
      messages: [],
      newMessage: ''
    }
  },
  created() {
    this.getfriends(),
      window.setInterval(async () => {
        if (this.selectedFriend.user_id) {
          const response = await getChatHistory(this.selectedFriend.user_id)
          if (this.messages.length !== response.data.messages.length) {
            // MessagePlugin.info({ content: '收到了新消息，请查收', duration: 1000 })
            this.messages = response.data.messages
          }
        }
      }, 1000)
  },
  computed: {
    isDisabled() {
      return (
        this.selectedFriend.length === 0 ||
        (this.userStore.userInfo.token && this.userStore.userInfo.token.length === 0)
      )
    }
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.unshift({
          message_id: Date.now(),
          content: this.newMessage,
          from_user_id: 'current_user_id', // 用当前用户的 ID
          createTime: new Date()
        })

        this.scrollToBottom()
        await chatAPI.sendmessage(this.selectedFriend.user_id, this.newMessage)
        this.newMessage = ''
      }
    },
    async getfriends() {
      const res = await getFriendsList()
      this.friends = res.data.users
      if (this.friends.length > 0) {
        this.selectFriend(this.friends[0])
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const messages = this.$refs.messages
        messages.scrollTop = messages.scrollHeight
      })
    },
    async selectFriend(friend) {
      this.selectedFriend = friend
      const response = await getChatHistory(friend.user_id)
      this.messages = response.data.messages
      this.scrollToBottom()
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString()
    }
  }
}
</script>

<style scoped>
.chat-app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.chat-container {
  display: flex;
  width: 80vw;
  height: 80vh;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
}

.chat-sidebar {
  width: 200px;
  border-right: 1px solid #ccc;
  padding: 10px;
  background-color: #f5f5f5;
}

.friend-list {
  list-style: none;
  padding: 0;
}

.friend-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.selected {
  background-color: #ddd;
}

.friend-list li:hover {
  background-color: #e0e0e0;
}

.friend-list img.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #f5f5f5;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse; /* 改变方向，使消息倒序显示 */
}

.chat-message {
  display: flex;
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  position: relative;
}

.chat-message.sent {
  align-self: flex-end;
  background-color: #d1e7dd;
  text-align: right;
  justify-content: flex-end;
  align-items: flex-end;
}

.chat-message.sent .message-content {
  /* justify-content: flex-end; 将头像放到最右边 */
  align-items: flex-end; /*垂直居中文本和头像*/
  display: flex;
  flex-direction: column;
  max-width: 400px;
}

.chat-message.sent .message-content .avatar {
  margin-left: 10px; /* 为了与文本产生间距 */
}

.chat-message:not(.sent) {
  align-self: flex-start;
  background-color: #f8d7da;
}

.chat-message:not(.sent) .message-content {
  display: flex;
  justify-content: flex-start; /* 保持文本框在左侧 */
}

.chat-message img.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px;
}

.message-text {
  display: flex;
  flex-direction: column;
  max-width: 90%;
  min-width: 150px;
  line-break: anywhere;
  font-size: 18px;
  font-weight: bold;
}
.message-text .timestamp {
  color: #999;
  font-size: 12px;
  font-weight: normal;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #f5f5f5;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}

.chat-input button:hover .send-icon {
  filter: brightness(1.2);
}

.send-icon {
  width: 35px;
  height: 24px;
}
</style>
