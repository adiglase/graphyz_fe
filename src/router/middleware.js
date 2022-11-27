import { Notify } from "quasar"
import { useUserStore } from "src/stores/user-store"

export function checkAccessMiddleware(to, from, next) {
  const userStore = useUserStore()
  const currentUser = userStore.userData

  const isAuthRoute = to.matched.some((item) => item.meta.isRequireAuth)

  if (isAuthRoute && currentUser) return next()

  if (isAuthRoute) {
    next({ name: "login" })
    return Notify.create({
      type: "negative",
      message: "from middleware",
    })
  }

  next()
}
