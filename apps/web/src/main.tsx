import { render } from "solid-js/web";
import "./index.css";
import App from "./App";

render(() => <App />, document.getElementById("root")!);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  let mounted = true;

  const register = () => {
    if (!mounted) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch((error) => {
        console.error("Service worker registration failed.", error);
      });
  };

  if (document.readyState === "complete") {
    register();
  } else {
    window.addEventListener("load", register, { once: true });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      mounted = false;
    }
  });
}