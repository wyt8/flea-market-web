<script setup>
const props = defineProps(['cover_image_url', 'name', 'price', 'date', 'product_id'])
</script>

<template>
  <div class="card-container">
    <div class="cover">
      <img :src="props.cover_image_url" alt="" />
    </div>
    <div class="info">
      <div class="name">{{ props.name }}</div>
      <div class="price-and-date">
        <div class="price">
          ￥ <span>{{ props.price }}</span>
        </div>
        <div class="date">{{ new Date(props.date).toLocaleDateString() }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  width: 250px;
  height: 350px;
  background-color: beige;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);

    img {
      transform: scale(1.05);
    }
  }
}

.cover {
  width: 100%;
  height: 250px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.8s;
  }
}

.info {
  padding: 10px;
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /*弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 2; /*限制在一个块元素显示的文本的行数*/
    -webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/
    height: 50px;
    font-size: 18px;
    font-weight: bold;
  }

  .price-and-date {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .price {
      color: orange;

      span {
        font-size: 24px;
      }
    }

    .date {
      font-size: 12px;
      color: #aaa;
    }
  }
}
</style>
