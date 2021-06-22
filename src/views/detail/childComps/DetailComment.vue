<template>
  <div id="detail_comment" v-if="Object.keys(comment).length != 0">
    <div class="comment_title">
      <span class="comment_name">用户评价</span>
      <span class="comment_more">更多</span>
    </div>
    <div class="comment_info">
      <div class="u_info">
        <img :src="comment.user.avatar" alt="" />
        <span>{{ comment.user.uname }}</span>
      </div>
      <div class="comment_content">
        <div class="content">{{ comment.content }}</div>
        <p class="content_info">
          {{ comment.created | dateShow }} {{ comment.style }}
        </p>
      </div>
    </div>
    <div class="comment_img" v-if="comment.images != null">
      <img
        :src="item"
        alt=""
        v-for="(item, index) in comment.images"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import { formatDate } from "common/utils.js";
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    dateShow(value) {
      let date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>
<style scoped>
#detail_comment {
  font-size: 0.65rem;
  padding: 0.42rem 0.34rem;
  border-bottom: 5px solid #f2f5f8;
}
.comment_title {
  padding: 0.42rem 0;
  padding-bottom: 0.8rem;
  border-bottom: 0.08rem solid rgba(128, 128, 128, 0.3);
  position: relative;
}

.comment_more {
  position: absolute;
  right: -0.26rem;
}

.u_info {
  padding: 0.42rem 0;
  line-height: 1.8rem;
  display: flex;
}
.u_info img {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  border: 0.04rem solid rgba(128, 128, 128, 0.3);
}
.u_info span {
  margin-left: 0.42rem;
}

.content {
  line-height: 1rem;
  color: #666;
}
.content_info {
  color: #999;
  padding: 0.3rem 0;
}

.comment_img img {
  margin-right: 0.21rem;
  width: auto;
  height: 4.26rem;
}
</style>
