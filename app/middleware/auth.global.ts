export default defineNuxtRouteMiddleware((to, from) => {
  // 如果访问根路径，重定向到/home
  if (to.path === '/') {
    return navigateTo('/home')
  }
  
  // 如果访问/home路径，直接放行（不进行重定向）
  if (to.path === '/home') {
    return
  }
})