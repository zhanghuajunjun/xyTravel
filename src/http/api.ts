import service from './index'

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
  }
}