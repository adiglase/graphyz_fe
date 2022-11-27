import LoginIllustration from "src/pages/LoginPage/TheIllustration.vue"
import LoginForm from "src/pages/LoginPage/TheForm.vue"
import SignUpIllustration from "src/pages/SignUpPage/TheIllustration.vue"
import SignUpForm from "src/pages/SignUpPage/TheForm.vue"
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        meta: { isRequireAuth: true },
        component: () => import("pages/IndexPage.vue"),
        name: "index",
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        components: {
          illustration: LoginIllustration,
          form: LoginForm,
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        components: {
          illustration: SignUpIllustration,
          form: SignUpForm,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
]

export default routes
