import service from './index'
const token = localStorage.getItem('token')!
console.log(token);
export default {
  // 获取轮播图
  getBanners() {
    return service.get('/scenics/banners')
  },
  // 获取验证码
  captchas({ tel }: { tel: string }) {
    return service.post("/captchas", { tel })
  },
  // 注册
  register({ username, nickname, captcha, password }: { username: string; nickname: string; captcha: string; password: string }) {
    return service.post('/accounts/register', { username, nickname, captcha, password })
  },
  // 登录
  login({ username, password }: { username: string; password: string }) {
    return service.post('/accounts/login', { username, password })
  },
  // 城市菜单列表
  getCities() {
    return service.get('/posts/cities')
  },
  // 文章列表
  getPosts() {
    return service.get(`posts`)
  },
  // 文章详情
  getPostsDetail({ id }: { id: number }) {
    return service.get(`posts?id=${id}`)
  },
  // 获取文章评论
  getComments({ post, _limit, _start }: { post: number; _limit: number; _start: number }) {
    return service.get(`/posts/comments?post=${post}&_limit=${_limit}&_start=${_start}`)
  },
  // 提交文章评论
  postsComments({ content, pics, post, follow }: { content: string; pics: any; post: number; follow: number }) {
    return service.post(`comments`, {
      content, pics, post, follow
    })
  },
  // 推荐文章
  recommend(id: number) {
    return service.get(`/posts/recommend?id=${id}`)
  },
  // 出发城市
  citySort(name: string) {
    return service.get(`/cities?name=${name}`)
  },
  // 推荐机票
  airsSale() {
    return service.get(`/airs/sale`)
  },
  // 机票列表
  airslist({ departCity, departCode, destCity, destCode, departDate }: { departCity: string; departCode: string; destCity: string; destCode: string; departDate: string }) {
    return service.get(`airs?departCity=${departCity}&departCode=${departCode}&destCity=${destCity}&destCode=${destCode}&departDate=${departDate}`)
  },
  // 选择机票
  choose({ id, seatXid }: { id: number; seatXid: string }) {
    return service.get(`airs/${id}?seat_xid=${seatXid}`)
  },
  // 提交机票订单
  airorders({ users, insurances, contactName, contactPhone, invoice, seat_xid, air, captcha }: { users: any; insurances: any; contactName: string; contactPhone: string; invoice: boolean; seat_xid: string; air: number; captcha: string }) {
    return service.post("/airorders", { users, insurances, contactName, contactPhone, invoice, seat_xid, air, captcha }
      , {
        headers: {
          Authorization: "Bearer " + token
        }
      })
  },
  // 订单详情
  airorderDetail(id: number) {
    return service.get(`/airorders/${id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  },
  // 支付状态
  checkpay({ id, nonce_str, out_trade_no }: { id: number; nonce_str: number; out_trade_no: number }) {
    return service.post('/airorders/checkpay', { id, nonce_str, out_trade_no }, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  }
}