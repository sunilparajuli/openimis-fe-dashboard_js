import messages_en from "./translations/en.json";
import reducer from "./reducer";
import DashboardPage from "./pages/DashboardPage";
const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "reducers": [{ key: "dashboard", reducer }],
    "refs": [   
      { key: "dashboard.Analytics", ref: DashboardPage },
    ],
  "core.Router": [{ path: "dashboard/analytics", component: DashboardPage }],
  "home.HomePage.Blocks": [],
};

export const DashboardModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
};
