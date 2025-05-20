import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <div className="bg-background-light dark:bg-black">
      <App />
    </div>
  </RecoilRoot>,
);
