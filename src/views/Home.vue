<template>
  <div>
    <a-carousel arrows autoplay>
      <template v-slot:prevArrow>
        <div class="custom-slick-arrow" style="left: 10px;zIndex: 1">
          <left-circle-outlined />
        </div>
      </template>
      <template v-slot:nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <right-circle-outlined />
        </div>
      </template>
      <div v-for="item in banners" :key="item.url">
        <img :src="`http://157.122.54.189:9095${item.url}`" alt />
      </div>
    </a-carousel>
    <div class="banner-content f-dir-mid">
      <div class="search-bar">
        <div class="d-flex">
          <div class="price hover" :class="activeIndex == 0?'active':''" @click="strategy">
            <span>攻略</span>
          </div>
          <div class="price hover" :class="activeIndex == 1?'active':''" @click="hotel">
            <span>酒店</span>
          </div>
          <div class="price hover" :class="activeIndex == 2?'active':''" @click="ticket">
            <span>机票</span>
          </div>
        </div>
        <div class="search-input d-flex">
          <input :placeholder="placeholder" v-model="value" />
          <div class="flex-cent" style="width:40px">
            <SearchOutlined class="searchIcon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import api from "../http/api";
import { Res, ResItem, User } from "@/types/home.ts";
interface Data {
  banners: ResItem[];
  activeIndex: number;
  placeholder: string;
  value: string;
}
export default defineComponent({
  name: "Home",
  props: {},
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      banners: [],
      activeIndex: 0,
      placeholder: "搜索城市",
      value: "",
    });
    // 点击攻略
    const strategy = (): void => {
      data.activeIndex = 0;
    };
    // 点击酒店
    const hotel = (): void => {
      data.activeIndex = 1;
      data.placeholder = "请输入城市搜索酒店";
    };
    // 点击机票
    const ticket = (): void => {
      data.activeIndex = 2;
    };
    const route = useRoute();
    // 获取轮播图
    onMounted(() => {
      api
        .getBanners()
        .then((res: Res) => {
          data.banners = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      strategy,
      hotel,
      ticket,
    };
  },
});
</script>

<style scoped lang='scss'>
@import "../style/home/home.scss";
</style>
