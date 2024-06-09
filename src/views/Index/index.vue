<script setup></script>

<template>
  <t-swiper animation="fade" :height="350">
    <t-swiper-item v-for="item in 1" :key="item">
      <div class="poster">
        <img src="@/assets/imgs/poster.jpg" alt="" />
        <div class="text">BIT跳蚤市场</div>
      </div>
    </t-swiper-item>
  </t-swiper>
  <div class="about frame">
    <div class="header">关于我们</div>
    <div class="q-and-a">
      <div class="qestion">
        <span class="iconfont icon-gouwu"></span
        >本网站用于北理工学生校内二手市场平台。学生们可以交换物品，购买廉价商品，帮助学生们更方便地买卖二手物品。
      </div>
    </div>
  </div>

  <div class="common-question frame">
    <div class="header">常见问题</div>
    <div class="q-and-a">
      <div class="qestion">
        <span class="iconfont icon-changjianwentixiangguanwenti"></span>无法发布商品？
      </div>
      <div class="answer">
        <span class="iconfont icon-huida"></span>用户需要进行身份认证，认证成功后，才可发布商品。
      </div>
    </div>
    <div class="q-and-a">
      <div class="qestion">
        <span class="iconfont icon-changjianwentixiangguanwenti"></span>买家使用流程？
      </div>
      <div class="answer">
        <span class="iconfont icon-huida"></span
        >用户需要先注册账号，再进行实名认证。接下来就可以选购商品以及和卖方联系，最终交易成功。
      </div>
    </div>
    <div class="q-and-a">
      <div class="qestion">
        <span class="iconfont icon-changjianwentixiangguanwenti"></span>卖家使用流程？
      </div>
      <div class="answer">
        <span class="iconfont icon-huida"></span
        >用户需要先注册账号，再进行实名认证。实名认证成功后方可发布商品，接着可以与买方联系，最终交易成功。
      </div>
    </div>
    <div class="q-and-a">
      <div class="qestion">
        <span class="iconfont icon-changjianwentixiangguanwenti"></span>禁止售卖商品类型？
      </div>
      <div class="answer">
        <span class="iconfont icon-huida"></span
        >电子书、烟酒、演出票等，注意管理员有权下架禁售商品。
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.poster {
  position: relative;
  height: 350px;
  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }

  .text {
    position: absolute;
    top: 150px;
    z-index: 100;
    width: 100%;
    text-align: center;
    color: #db0a9f;
    font-size: 72px;
  }
}

.frame {
  padding: 0px 20px;
  max-width: 1400px;
  margin: 0 auto;
  .header {
    font-size: 48px;
    color: #db0a9f;
    font-weight: bold;
    text-align: center;
    margin: 40px 0;
  }
  .iconfont {
    font-size: 36px;
    margin-right: 15px;
  }

  .q-and-a {
    font-size: 36px;
    font-weight: bolder;
    margin: 40px 0;

    .answer {
      margin: 10px 0;
      color: #b9b9b9;
    }
  }
}
</style>
