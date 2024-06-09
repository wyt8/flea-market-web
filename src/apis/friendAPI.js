import httpInstance from '@/utils/http';

export const getFriendsList = () => {
  return httpInstance.get('/messages/users', {
    params: {
      // 添加需要的参数，例如 last_user_id 和 num
      last_user_id: 0,
      num: 10
    }
  });
};
