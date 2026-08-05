// ─────────────────────────────────────────────────────────────────────────────
// Portfolio Visitor Tracker
// Fires once per browser session and sends visitor data via EmailJS
// ─────────────────────────────────────────────────────────────────────────────

const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_VISITOR;
const SESSION_KEY = "portfolio_tracked";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  return "Unknown";
}

function getOS(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Windows NT 10.0")) return "Windows 10/11";
  if (ua.includes("Windows NT 6.3")) return "Windows 8.1";
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown";
}

function getDevice(): string {
  const ua = navigator.userAgent;
  if (ua.includes("iPhone") || ua.includes("Android") && ua.includes("Mobile")) return "📱 Mobile";
  if (ua.includes("iPad") || ua.includes("Android") && !ua.includes("Mobile")) return "📟 Tablet";
  return "🖥️ Desktop";
}

function getReferrer(): string {
  if (!document.referrer || document.referrer === "") return "🔗 Direct (typed URL or bookmark)";
  try {
    const url = new URL(document.referrer);
    const host = url.hostname.replace("www.", "");
    if (host.includes("google")) return `🔍 Google`;
    if (host.includes("linkedin")) return `💼 LinkedIn`;
    if (host.includes("github")) return `🐙 GitHub`;
    if (host.includes("twitter") || host.includes("x.com")) return `🐦 Twitter/X`;
    if (host.includes("facebook")) return `📘 Facebook`;
    if (host.includes("instagram")) return `📸 Instagram`;
    return `🌐 ${host}`;
  } catch {
    return document.referrer;
  }
}

function formatDate(): string {
  return new Date().toLocaleString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

// ── Main Tracker ──────────────────────────────────────────────────────────────

export async function trackVisitor(): Promise<void> {
  // Only fire once per browser session
  if (sessionStorage.getItem(SESSION_KEY)) return;
  sessionStorage.setItem(SESSION_KEY, "1");

  try {
    // Dynamically import EmailJS to keep it out of the critical bundle
    const emailjs = await import("@emailjs/browser");
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Geo-locate the visitor (free tier: 1,000 req/day)
    let country = "Unknown";
    let city = "Unknown";

    try {
      const geo = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
      if (geo.ok) {
        const data = await geo.json();
        country = `${data.country_name ?? "Unknown"} ${data.country_code ? `(${data.country_code})` : ""}`.trim();
        city = [data.city, data.region].filter(Boolean).join(", ") || "Unknown";
      }
    } catch {
      // Geo failed silently — still send the rest
    }

    const templateParams = {
      visit_time: formatDate(),
      country,
      city,
      referrer: getReferrer(),
      browser: getBrowser(),
      os: getOS(),
      device: getDevice(),
      screen: `${window.screen.width}×${window.screen.height}`,
      language: navigator.language || "Unknown",
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

    console.log("[Tracker] Visitor data sent ✅");
  } catch (err) {
    // Fail silently — never break the portfolio experience
    console.warn("[Tracker] Failed to send visitor data:", err);
  }
}
