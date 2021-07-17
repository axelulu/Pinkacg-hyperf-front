// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false }
          }
        ]
      },
      // system
      {
        path: '/system',
        redirect: '/system/manager',
        component: RouteView,
        meta: { title: 'menu.system', icon: 'form', permission: [2, 3, 4, 26] },
        children: [
          {
            path: '/system/menu',
            name: 'Menu',
            component: () => import('@/views/system/menu'),
            meta: { title: 'menu.system.menu', keepAlive: true, permission: [26] }
          },
          {
            path: '/system/permission',
            name: 'Permission',
            component: () => import('@/views/system/permission'),
            meta: { title: 'menu.system.permission', keepAlive: true, permission: [2] }
          },
          {
            path: '/system/role',
            name: 'Role',
            component: () => import('@/views/system/role'),
            meta: { title: 'menu.system.role', keepAlive: true, permission: [3] }
          },
          {
            path: '/system/user',
            name: 'User',
            component: () => import('@/views/system/user'),
            meta: { title: 'menu.system.user', keepAlive: true, permission: [4] }
          }
        ]
      },
      // content_setting
      {
        path: '/content',
        name: 'content',
        component: RouteView,
        redirect: '/content/post',
        meta: { title: 'menu.content', icon: 'table', permission: [32, 31, 28, 30] },
        children: [
          {
            path: '/content/post',
            name: 'Post',
            component: () => import('@/views/content/post'),
            meta: { title: 'menu.content.post', keepAlive: true, permission: [28] }
          },
          {
            path: '/content/category',
            name: 'Category',
            component: () => import('@/views/content/category'),
            meta: { title: 'menu.content.category', keepAlive: true, permission: [30] }
          },
          {
            path: '/content/tag',
            name: 'Tag',
            component: () => import('@/views/content/tag'),
            meta: { title: 'menu.content.tag', keepAlive: true, permission: [31] }
          },
          {
            path: '/content/comment',
            name: 'Comment',
            component: () => import('@/views/content/comment'),
            meta: { title: 'menu.content.comment', keepAlive: true, permission: [32] }
          }
        ]
      },
      // site_setting
      {
        path: '/site',
        name: 'site',
        component: RouteView,
        redirect: '/site/meta',
        meta: { title: 'menu.site', icon: 'table', permission: [29] },
        children: [
          {
            path: '/site/meta',
            name: 'Meta',
            component: () => import('@/views/site/meta'),
            meta: { title: 'menu.site.meta', keepAlive: true, permission: [29] }
          },
          {
            path: '/site/cms',
            name: 'Cms',
            component: () => import('@/views/site/cms'),
            meta: { title: 'menu.site.cms', keepAlive: true, permission: [29] }
          },
          {
            path: '/site/footer',
            name: 'Footer',
            component: () => import('@/views/site/footer'),
            meta: { title: 'menu.site.footer', keepAlive: true, permission: [29] }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: [2] },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: [2] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: [2] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: [2]
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: [2] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: [2] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: [2]
                }
              }
            ]
          }
        ]
      }

    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
