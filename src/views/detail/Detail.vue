<template>
  <div class="container">
    <div class="content_left">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <span class="fwei blue hover">旅游攻略</span>
        <span class="padd-lrs fwei" style="color:#c0c4cc">/</span>
        <span style="color:#606266">攻略详情</span>
      </div>
      <!-- 详情页 -->
      <div v-for="item in detail" :key="item.id">
        <h1 class="title">{{item.title}}</h1>
        <div class="flex-end paddes" style="color:#999999">
          <span class="marg-ries">攻略：{{createdAt}}</span>
          <span>阅读：{{item.watch}}</span>
        </div>
        <!-- 单个文章详情 -->
        <div v-html="item.content"></div>
        <!-- 评论分享 -->
        <div class="flex-cent post-ctrl">
          <div class="d-flex">
            <div class="f-dir-mid marg-ries">
              <FormOutlined class="icon" />
              <div class="icon_name">评论({{total}})</div>
            </div>
            <div class="f-dir-mid">
              <ShareAltOutlined class="icon" />
              <div class="icon_name">分享</div>
            </div>
          </div>
        </div>
        <!-- 评论详情 -->
        <div>
          <div class="comment">评论</div>
          <!-- 评论框 -->
          <div class="el-textarea">
            <textarea
              v-model="value"
              autocomplete="off"
              placeholder="说点什么吧..."
              class="el-textarea__inner"
              style="resize: none; min-height: 33px;"
            ></textarea>
          </div>
          <!-- 图片上传，提交评论 -->
          <div class="flex-j-sb">
            <div class="clearfix">
              <a-upload
                name="files"
                :Header="header"
                action="/upload/upload"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div>
                  <plus-outlined />
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
            <a-button type="primary">提交</a-button>
          </div>
          <!-- 评论详情 -->
          <div v-if="comment.length>0">
            <div class="cmt-list">
              <div v-for="item in comment" :key="item.id" class="cmt-item">
                <!-- 如果右父级评论 -->
                <div v-if="item.parent">
                  <div class="flex-j-sb">
                    <div class="cmt-info">
                      <img
                        :src="`http://157.122.54.189:9095${item.account.defaultAvatar}`"
                        class="defaultAvatar"
                      />
                      <span class="padd-lr">{{item.account.nickname}}</span>
                      <span class="padd-lr">{{createdTime}}</span>
                    </div>
                    <div class="cmt-info">{{item.level}}</div>
                  </div>
                  <!-- 递归 -->
                  <my-tree :parent="item.parent" class="tree paddten"></my-tree>
                  <div class="marg-lees">
                    <div>{{item.content}}</div>
                    <div v-if="item.pics.length>0" class="d-flex f-f-warp">
                      <div v-for="item1 in item.pics" :key="item1.id">
                        <img :src="`http://157.122.54.189:9095${item1.urlr}`" class="pics_img" />
                      </div>
                    </div>
                    <div class="cmt-ctrl">
                      <span class="huifu hover">回复</span>
                    </div>
                  </div>
                </div>
                <!-- 没有父级评论 -->
                <div v-else>
                  <div class="flex-j-sb">
                    <div class="cmt-info">
                      <img
                        :src="`http://157.122.54.189:9095${item.account.defaultAvatar}`"
                        class="defaultAvatar"
                      />
                      <span class="padd-lr">{{item.account.nickname}}</span>
                      <span class="padd-lr">{{createdTime}}</span>
                    </div>
                    <div class="cmt-info">{{item.level}}</div>
                  </div>
                  <div class="marg-lees">
                    <div>{{item.content}}</div>
                    <div v-if="item.pics.length>0" class="d-flex f-f-warp">
                      <div v-for="item1 in item.pics" :key="item1.id">
                        <img :src="`http://157.122.54.189:9095${item1.urlr}`" class="pics_img" />
                      </div>
                    </div>
                    <div class="cmt-ctrl">
                      <span class="huifu hover">回复</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-j-c marg-tops">
              <a-pagination
                :page-size-options="pageSizeOptions"
                :total="total"
                show-size-changer
                show-quick-jumper
                v-model:current="current"
                v-model:pageSize="pageSize"
                :show-total="total => `共 ${total} 条`"
                @change="changeSize"
                @showSizeChange="showSizeChange"
              >
                <template v-slot:buildOptionText="props">
                  <span>{{ props.value }}条/页</span>
                </template>
              </a-pagination>
            </div>
          </div>
          <div v-else class="no_cmt flex-j-c">暂无评论，快来抢占沙发</div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import { useRoute } from "vue-router";
import api from "@/http/api";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons-vue";
import myTree from "@/components/comment/MyTree.vue";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
interface HeaderItem {
  Authorization: string;
}
interface Data {
  detail: any;
  createdAt: string;
  createdTime: string;
  value: string;
  previewVisible: boolean;
  previewImage: string;
  fileList: any[];
  pageSizeOptions: string[];
  current: number;
  pageSize: number;
  comment: any;
  total: number;
  header: HeaderItem;
}
export default defineComponent({
  name: "",
  props: {},
  components: { PlusOutlined, myTree },
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      detail: [],
      createdAt: "",
      createdTime: "",
      value: "",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      pageSizeOptions: ["3", "5", "10", "15"],
      pageSize: 3,
      current: 1,
      comment: [],
      total: 0,
      header: {
        Authorization: "",
      },
    });
    const route = useRoute();
    const handleCancel = (): void => {
      data.previewVisible = false;
    };
    const handlePreview = (file: any) => {
      console.log(file);
    };
    const handleChange = (a: any,b: any,c: any): void => {
      // data.fileList = fileList;
      console.log(a, b,c);
    };
    // 改变页码
    const changeSize = (page: number, pageSize: number): void => {
      console.log(page);
      console.log(pageSize);
    };
    // 改变页面条数
    const showSizeChange = (current: number, size: number): void => {
      console.log(current);
      console.log(size);
    };
    const getComment = (id: string): void => {
      api
        .getComments({
          post: Number(id),
          _limit: data.pageSize,
          _start: data.current,
        })
        .then((res) => {
          res.data.map((item: any) => {
            data.createdTime = item.updated_at;
            data.createdTime = dayjs(data.createdTime).format(
              "YYYY-MM-DD HH:mm"
            );
          });
          (data.total = res.total), (data.comment = res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => {
      data.header.Authorization = "Bearer " + localStorage.getItem("token");
      const id: string = route.query.id! as string;
      getComment(id);
      api
        .getPostsDetail({ id: Number(id) })
        .then((res: any) => {
          res.data.map((item: any) => {
            data.createdAt = item.created_at;
            data.createdAt = dayjs(data.createdAt).format("YYYY-MM-DD HH:mm");
          });
          data.detail = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      ...toRefs(data),
      handleCancel,
      handleChange,
      handlePreview,
      changeSize,
      showSizeChange,
    };
  },
});
</script>

<style scoped lang='scss'>
@import "../../style/detail/Detail.scss";
</style>