import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { userLoginStore } from '@/store/loginUser.js'
import { storeToRefs } from 'pinia';
import HomePage from '../views/HomePage.vue'
import RoleView from '../views/RoleView.vue'
import UserView from '../views/UserView.vue'
import UserCategory from '../views/UserCategory.vue'
import OrderList from '../views/OrderList.vue'
import OrderCategory from '../views/OrderCategory.vue'
const roleEnum = {
  '/homePage': {
    path: '/homePage',
    name: 'homePage',
    component: HomePage
  },
  '/role': {
    path: '/role',
    name: 'role',
    component: RoleView,
  },
  '/userList': {
    path: '/userList',
    name: 'userList',
    component: UserView,
  },
  '/userCategory': {
    path: '/userCategory',
    name: 'userCategory',
    component: UserCategory,
  },
  '/orderList': {
    path: '/orderList',
    name: 'orderList',
    component: OrderList,
  },
  '/orderCategory': {
    path: '/orderCategory',
    name: 'orderCategory',
    component: OrderCategory,
  }
}
const routes = [
  {
    name: 'home',
    component: HomeView,
    path: '/',
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: HomePage
      }
    ],
    redirect: '/homePage'//在children的后面加一个redirect：'/想要默认展示的子路由名字'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/noRight',
    name: 'noRight',
    component: () => import('../views/noRight.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const token = window.localStorage.getItem('token')
  if (!token) return next('/login')
  next()
  
})

export default router
export function setRoutes() {
  const store = userLoginStore()
  const { loginUserInfo } = storeToRefs(store)
  if(!loginUserInfo.value){
    return
  }
  const rights = loginUserInfo.value.rights
  for (let i = 0; i < rights.length; i++) {
    if (roleEnum[rights[i].role_path]) {
      router.addRoute('home', roleEnum[rights[i].role_path])
    }
    rights[i].children.forEach(function (item) {
      if (item.role_path) {
        router.addRoute('home', roleEnum[item.role_path])
      }
    });
  }

  console.log(router.getRoutes())
}

