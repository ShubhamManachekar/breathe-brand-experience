let initialized = false;
let measurementId: string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const initAnalytics = (id?: string) => {
  if (!id || initialized) return;

  measurementId = id;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", id, { send_page_view: false });
  initialized = true;
};

export const trackPageView = (path: string) => {
  if (!initialized || !measurementId || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    send_to: measurementId,
  });
};
