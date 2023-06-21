
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";

require('dotenv').config()
import { 
  Quasar,  
  QPageSticky,
  QPageScroller,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QTooltip,
  QBtn,
  QBtnToggle,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QImg,
  QItemLabel,
  QBtnDropdown,
  QSeparator,
  QExpansionItem,
  QSpinner,
  QField,
  QInput,
  QMenu,
  QSpinnerFacebook,
  QFooter,
  QDialog,
  QBtnGroup,
  QSelect,
  QBanner,
  QVideo,
  QInfiniteScroll,
  QSpinnerDots,
  QSpinnerBall,
  QChip,
  QLinearProgress,
  QCheckbox,
  QRadio,
  QDate,
  QTime,
  QCard,
  QCardSection,
  QCardActions,
  QChatMessage,
  QUploader,
  QCarousel,
  QCarouselSlide,
  QCarouselControl,
  QRating,
  QTabs,
  QTab,
  QTabPanel,
  QTabPanels,
  QPagination,
  QAvatar,
  QPopupProxy,
  QPullToRefresh,
  QEditor,
  QScrollObserver,
  QScrollArea,
  QBadge,
  QSlideItem,
  QSkeleton,
  QToggle,
  QFab,
  QFabAction,
  } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import { Notify } from 'quasar'



const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
appInstance.use(Quasar, { 
    components: { 
      QPageSticky,
      QPageScroller,
      QLayout,
      QHeader,
      QDrawer,
      QPageContainer,
      QPage,
      QToolbar,
      QToolbarTitle,
      QTooltip,
      QBtn,
      QBtnToggle,
      QIcon,
      QList,
      QItem,
      QItemSection,
      QImg,
      QItemLabel,
      QBtnDropdown,
      QSeparator,
      QExpansionItem,
      QSpinner,
      QField,
      QInput,
      QMenu,
      QSpinnerFacebook,
      QFooter,
      QDialog,
      QBtnGroup,

      QSelect,
      QBanner,

      QVideo,
      QInfiniteScroll,
      QSpinnerDots,
      QSpinnerBall,
      QChip,
      QLinearProgress,
      QCheckbox,
      QRadio,
      QDate,
      QTime,
      QCard,
      QCardSection,
      QCardActions,
      QChatMessage,
      QUploader,
      QCarousel,
      QCarouselSlide,
      QCarouselControl,
      QRating,
      QTabs,
      QTab,
      QTabPanel,
      QTabPanels,
      QPagination,
      QAvatar,
      QPopupProxy,
      QPullToRefresh,
      QEditor,
      QScrollObserver,
      QScrollArea,
      QBadge,
      QSlideItem,
      QSkeleton,
      QToggle,
      QFab,
      QFabAction,
      
    },
    plugins: {
      Notify
    }
  });
  
