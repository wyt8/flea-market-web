import httpInstance from '@/utils/http';

// 获取聊天记录的函数
export const getChatHistory = (user_id) => {
  return httpInstance.get(`/messages/users/${user_id}`);
};

const sendmessage = (to_id, content) => {  
  return httpInstance.post(`/messages`, {  
    to_id, 
    content
  });  
};
export default{
  sendmessage
}