import { Notify } from "quasar"
import { useUserStore } from "src/stores/user-store"
import { AuthService } from "src/services/auth.service"
import { UsersService } from "src/services/users.service"

export async function initCurrentUserStateMiddleware(to, from, next) {
  const userStore = useUserStore()
  const currentUser = userStore.userData

  if (!currentUser && AuthService.getToken()) {
    try {
      const response = await UsersService.getCurrentUser()
      userStore.setUserData(response.data)
      next()
    } catch (e) {
      next()
    }
  } else {
    next()
  }
}

export function checkAccessMiddleware(to, from, next) {
  const userStore = useUserStore()
  const currentUser = userStore.userData

  const isAuthRoute = to.matched.some((item) => item.meta.isRequireAuth)

  if (isAuthRoute && currentUser) return next()

  if (isAuthRoute) {
    next({ name: "login" })
    return Notify.create({
      type: "negative",
      message: "Please sign in",
    })
  }

  next()
}
