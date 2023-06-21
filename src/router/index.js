import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import userTables from "@/views/UserTables.vue";
import Profile from "@/views/Profile.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import generatesop from "@/views/GenerateSop.vue";
import Sop_library from "@/views/Sop_library.vue";
import Sop_archive from  "@/views/Sop_archive";
import rolemanagement from "@/views/Usermanagement.vue";
import UserDetails from "../views/components/UserDetails.vue"
import feedback from "../views/feedback.vue"
import contact from "../views/contact.vue"
import Security from "../views/Checklists/Security.vue"
import beautyadvisor from "../views/Checklists/beautyadvisor.vue"
import Nutritionist from "../views/Checklists/Nutritionist.vue"
import Operations from "../views/Checklists/Operations.vue"
import Pharmacist from "../views/Checklists/Pharmacist.vue"
import lossprevention from "../views/Checklists/lossprevention.vue"
import Checklist from "../views/Checklist.vue"
import Sopupload from "../views/Sopupload.vue"
import Archivechecklist from "../views/Archivechecklist.vue"


const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
    meta: { requiresAuth: true },
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: UserDetails
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: feedback
  },
  {
    path: '/Contact',
    name: 'contact',
    component:  contact
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/generatesop",
    name: "generatesop",
    component: generatesop,
    meta: { requiresAuth: true },
  },
  {
    path: "/Sopupload",
    name: "Sopupload",
    component: Sopupload,
  },
  {
    path: '/generatesop/:id',
    name: 'edit-sop',
    component: generatesop
  },
  {
    path: "/Sop_library",
    name: "Sop_library",
    component: Sop_library,
  /*   meta: { requiresAuth: true }, Sop_archive */
  },
  {
    path: "/Checklist",
    name: "Checklist",
    component: Checklist,
   /*  meta: { requiresAuth: true }, Sop_archive */
  },

  {
    path: "/Sop_archive",
    name: "Sop_archive",
    component: Sop_archive,
  },


  {
    path: "/Role_management",
    name: "rolemanagement",
    component: rolemanagement,
    meta: { requiresAuth: true },
  },
  {
    path: "/userTables",
    name: "userTables",
    component: userTables,
  },
  {
    path: "/Archivechecklist",
    name: "Archivechecklist",
    component: Archivechecklist,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
  // Checklists Routes
  {
    path: "/Security",
    name: "Security",
    component: Security,
  },
  {
    path: "/beauty_advisor",
    name: "beautyadvisor",
    component: beautyadvisor,
  },
  {
    path: "/Nutritionist",
    name: "Nutritionist",
    component:  Nutritionist,
  },
  {
    path: "/Operations",
    name: "Operations",
    component:  Operations,
  },
  {
    path: "/Pharmacists",
    name: "Pharmacist",
    component: Pharmacist,
  },
   {
    path: "/lossprevention",
    name: " lossprevention",
    component: lossprevention,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  // check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check if the user is authenticated
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      // if not authenticated, redirect to the sign-in page
      next({
        name: "Sign In"
      });
    } else {
      // if authenticated, proceed to the requested route
      // add your logic to check the token here
      // if the token is valid, proceed to the requested route
      // otherwise, redirect to the sign-in page
      next();
    }
  } else {
    // if the route does not require authentication, proceed to the requested route
    next();
  }
});

export default router;
