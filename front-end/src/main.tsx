import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// PWA install prompt for iOS
let deferredPrompt: Event | null = null;
window.addEventListener("beforeinstallprompt", (e) => {
  // For iOS devices, we can't use the beforeinstallprompt event
  // but we can keep this for other platforms
  deferredPrompt = e;
});

// Check if the user is on iOS and hasn't seen the install instructions
const isIOS = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  );
};

// Show iOS install instructions after a delay if they haven't been shown before
if (isIOS() && !localStorage.getItem("pwaInstallShown")) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const confirmed = confirm(
        "To get the full-screen experience, install this app on your iPhone: tap the 'Share' button below, then 'Add to Home Screen'"
      );
      if (confirmed) {
        localStorage.setItem("pwaInstallShown", "true");
      }
    }, 3000);
  });
}

createRoot(document.getElementById("root")!).render(<App />);
