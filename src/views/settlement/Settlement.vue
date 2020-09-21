<template>
  <div data-v-edb404ec class="container">
    <div data-v-edb404ec class="main">
      <div data-v-edb404ec class="pay-title">
        支付总金额
        <span data-v-edb404ec class="pay-price">￥ 1120</span>
      </div>
      <div data-v-edb404ec class="pay-main">
        <h4 data-v-edb404ec>微信支付</h4>
        <div
          data-v-edb404ec
          class="pay-qrcode el-row is-justify-space-between is-align-middle el-row--flex"
        >
          <div data-v-edb404ec class="qrcode">
            <canvas
              data-v-edb404ec
              id="qrcode-stage"
              height="200"
              width="200"
              style="height: 200px; width: 200px;"
            ></canvas>
            <p data-v-edb404ec>请使用微信扫一扫</p>
            <p data-v-edb404ec>扫描二维码支付</p>
          </div>
          <div data-v-edb404ec class="pay-example">
            <img data-v-edb404ec src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
// interface Data {
// }
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    // let data: Data = reactive<Data>({
    // })
    return {
      // ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.container[data-v-edb404ec] {
    background: #f5f5f5;
    padding: 30px 0;
}
.container .main[data-v-edb404ec] {
    width: 1000px;
    margin: 0 auto;
}
.container .main .pay-title[data-v-edb404ec] {
    text-align: right;
}
.container .main .pay-title span[data-v-edb404ec] {
    font-size: 28px;
    color: #ff4500;
}
.container .main .pay-main[data-v-edb404ec] {
    background: #fff;
    margin-top: 10px;
    border-top: 5px solid orange;
    padding: 30px;
}
.container .main .pay-main .pay-qrcode[data-v-edb404ec] {
    padding: 0 80px;
}
.el-row--flex.is-align-middle {
    align-items: center;
}
.el-row--flex.is-justify-space-between {
    justify-content: space-between;
}
.el-row--flex {
    display: flex;
}
.el-row {
    box-sizing: border-box;
}
.container .main .pay-main .qrcode[data-v-edb404ec] {
    border: 1px solid #ddd;
    padding: 15px;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
}
.container .main .pay-main .qrcode #qrcode-stage[data-v-edb404ec] {
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
}
.container .main .pay-main .qrcode p[data-v-edb404ec] {
    line-height: 2;
    text-align: center;
}
</style>