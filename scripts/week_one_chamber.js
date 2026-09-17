/* WDD 231 week one: shared chamber behavior. */
"use strict";

const storage = {
  get(type, key) {
    try { return window[type].getItem(key); } catch { return null; }
  },
  set(type, key, value) {
    try { window[type].setItem(key, value); return true; } catch { return false; }
  },
  remove(type, key) {
    try { window[type].removeItem(key); } catch { /* Storage may be unavailable. */ }
  }
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

document.documentElement.classList.add("js-enabled");
const navigation = document.querySelector("#primary_navigation");
const menuButton = document.querySelector(".menu-toggle");
if (menuButton && navigation) {
  menuButton.hidden = false;
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigation.classList.toggle("is-open", isOpen);
  });
  navigation.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      menuButton.focus();
    }
  });
}

document.querySelectorAll("[data-current-year]").forEach(element => {
  element.textContent = new Date().getFullYear();
});
document.querySelectorAll("[data-last-modified]").forEach(element => {
  const modified = new Date(document.lastModified);
  element.textContent = Number.isNaN(modified.getTime()) ? "Unavailable" :
    modified.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
});

function memberCard(member, profileButton = false) {
  const index = chamberMembers.indexOf(member);
  const badgeClass = member.level === "Gold" ? " badge-gold" : "";
  return `<article class="member-card">
    <img class="member-image" src="images/${escapeHtml(member.image)}" alt="${escapeHtml(member.alt)}" width="900" height="600" loading="lazy">
    <div class="member-body">
      <div class="member-topline"><span class="member-category">${escapeHtml(member.category)}</span><span class="badge${badgeClass}">${escapeHtml(member.level)}</span></div>
      <h3>${escapeHtml(member.name)}</h3>
      <p>${escapeHtml(member.description)}</p>
      <address>${escapeHtml(member.address)} · California City<br>${escapeHtml(member.phone)}</address>
      ${profileButton ? `<button type="button" class="text-button" data-member-index="${index}" aria-label="View ${escapeHtml(member.name)} profile">View member profile →</button>` : '<a class="text-link" href="week_one_chamber_directory.html">Explore member directory →</a>'}
    </div>
  </article>`;
}

const spotlights = document.querySelector("#member_spotlights");
if (spotlights) {
  const eligible = chamberMembers.filter(member => member.level === "Gold" || member.level === "Silver");
  const offset = Math.floor(Date.now() / 86400000) % eligible.length;
  const selected = Array.from({ length: Math.min(3, eligible.length) }, (_, index) =>
    eligible[(offset + index) % eligible.length]);
  spotlights.innerHTML = selected.map(member => memberCard(member)).join("");
}

const directory = document.querySelector("#member_directory");
if (directory) {
  const search = document.querySelector("#member_search");
  const category = document.querySelector("#category_filter");
  const level = document.querySelector("#level_filter");
  const count = document.querySelector("#member_count");
  const noResults = document.querySelector("#no_results");
  const gridButton = document.querySelector("#grid_view");
  const listButton = document.querySelector("#list_view");

  function renderDirectory() {
    const query = search.value.trim().toLowerCase();
    const filtered = chamberMembers.filter(member =>
      (!category.value || member.category === category.value) &&
      (!level.value || member.level === level.value) &&
      `${member.name} ${member.category} ${member.description} ${member.address}`.toLowerCase().includes(query));
    directory.innerHTML = filtered.map(member => memberCard(member, true)).join("");
    count.textContent = `${filtered.length} of ${chamberMembers.length} members`;
    noResults.hidden = filtered.length !== 0;
  }

  function setView(view) {
    directory.classList.toggle("list-view", view === "list");
    gridButton.setAttribute("aria-pressed", String(view !== "list"));
    listButton.setAttribute("aria-pressed", String(view === "list"));
    storage.set("localStorage", "week_one_chamber_directory_view", view);
  }

  search.addEventListener("input", renderDirectory);
  category.addEventListener("change", renderDirectory);
  level.addEventListener("change", renderDirectory);
  gridButton.addEventListener("click", () => setView("grid"));
  listButton.addEventListener("click", () => setView("list"));
  document.querySelector("#clear_filters").addEventListener("click", () => {
    search.value = "";
    category.value = "";
    level.value = "";
    renderDirectory();
    search.focus();
  });
  setView(storage.get("localStorage", "week_one_chamber_directory_view") === "list" ? "list" : "grid");
  renderDirectory();

  const dialog = document.querySelector("#member_dialog");
  let previousFocus;
  directory.addEventListener("click", event => {
    const button = event.target.closest("[data-member-index]");
    if (!button) return;
    const member = chamberMembers[Number(button.dataset.memberIndex)];
    if (!member) return;
    previousFocus = button;
    document.querySelector("#member_dialog_title").textContent = member.name;
    document.querySelector("#member_dialog_content").innerHTML =
      `<p class="tag">${escapeHtml(member.category)} · ${escapeHtml(member.level)} member</p>
      <p>${escapeHtml(member.description)}</p>
      <address>${escapeHtml(member.address)}<br>California City, California<br>${escapeHtml(member.phone)}</address>`;
    dialog.showModal();
  });
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener("close", () => previousFocus?.focus());
}

const visitMessage = document.querySelector("#visit_message");
if (visitMessage) {
  const now = Date.now();
  const lastVisit = Number(storage.get("localStorage", "week_one_chamber_last_visit"));
  if (lastVisit > 0 && lastVisit <= now) {
    const days = Math.floor((now - lastVisit) / 86400000);
    visitMessage.textContent = days < 1 ? "Welcome back! It’s good to see you again." :
      `Welcome back! Your last visit was ${days} ${days === 1 ? "day" : "days"} ago.`;
  }
  storage.set("localStorage", "week_one_chamber_last_visit", String(now));
}

function weatherDescription(code) {
  const descriptions = {
    0: "Clear sky", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Freezing fog", 51: "Light drizzle", 53: "Drizzle",
    55: "Heavy drizzle", 56: "Freezing drizzle", 57: "Heavy freezing drizzle",
    61: "Light rain", 63: "Rain", 65: "Heavy rain", 66: "Freezing rain",
    67: "Heavy freezing rain", 71: "Light snow", 73: "Snow", 75: "Heavy snow",
    77: "Snow grains", 80: "Light showers", 81: "Rain showers", 82: "Heavy showers",
    85: "Snow showers", 86: "Heavy snow showers", 95: "Thunderstorm",
    96: "Thunderstorm with hail", 99: "Heavy thunderstorm with hail"
  };
  return descriptions[code] || "Conditions unavailable";
}

function validWeatherData(data) {
  const current = data?.current;
  const daily = data?.daily;
  return Number.isFinite(current?.temperature_2m) &&
    Number.isFinite(current.relative_humidity_2m) &&
    Number.isFinite(current.weather_code) &&
    typeof current.time === "string" &&
    Array.isArray(daily?.time) && daily.time.length === 3 &&
    daily.time.every(day => typeof day === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(day) &&
      !Number.isNaN(new Date(`${day}T12:00:00`).getTime())) &&
    ["temperature_2m_max", "temperature_2m_min", "weather_code"].every(key =>
      Array.isArray(daily[key]) && daily[key].length === daily.time.length &&
      daily[key].every(Number.isFinite));
}

async function loadWeather() {
  const current = document.querySelector("#weather_current");
  if (!current) return;
  const forecast = document.querySelector("#weather_forecast");
  const retry = document.querySelector("#weather_retry");
  current.textContent = "Loading California City weather…";
  forecast.replaceChildren();
  retry.hidden = true;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    // California City, Kern County, California: forecast coordinates for the real locality.
    const url = "https://api.open-meteo.com/v1/forecast?latitude=35.1258&longitude=-117.9859&current=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&forecast_days=3";
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("Weather service unavailable.");
    const data = await response.json();
    if (!validWeatherData(data)) throw new Error("Incomplete weather data.");
    current.innerHTML = `<strong class="weather-temperature">${Math.round(data.current.temperature_2m)} °F</strong>
      <p class="weather-condition">${escapeHtml(weatherDescription(data.current.weather_code))}</p>
      <p class="weather-meta">Humidity: ${escapeHtml(data.current.relative_humidity_2m)}%<br>Updated: ${escapeHtml(data.current.time?.replace("T", " ") || "just now")} Pacific time</p>`;
    forecast.innerHTML = data.daily.time.map((day, index) => {
      const label = index === 0 ? "Today" :
        new Date(`${day}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" });
      return `<div><strong>${escapeHtml(label)}</strong>
        <span>${Math.round(data.daily.temperature_2m_max[index])}° / ${Math.round(data.daily.temperature_2m_min[index])}° F</span>
        <span>${escapeHtml(weatherDescription(data.daily.weather_code?.[index]))}</span></div>`;
    }).join("");
  } catch {
    current.textContent = "Live weather is unavailable right now. Check your connection and try again.";
    retry.hidden = false;
  } finally {
    clearTimeout(timeout);
  }
}
if (document.querySelector("#weather_current")) {
  document.querySelector("#weather_retry").addEventListener("click", loadWeather);
  loadWeather();
}

const application = document.querySelector("#membership_application");
if (application) {
  document.querySelector("#application_timestamp").value = new Date().toISOString();
  application.querySelector('button[type="submit"]').disabled = false;
  document.querySelectorAll("[data-select-level]").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelector("#membership_level").value = link.dataset.selectLevel;
      document.querySelector("#first_name").focus({ preventScroll: true });
    });
  });
  application.addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector("#form_error").hidden = true;
    if (!application.reportValidity()) return;
    const data = new FormData(application);
    const receipt = {
      first_name: String(data.get("first_name")).trim(),
      last_name: String(data.get("last_name")).trim(),
      email: String(data.get("email")).trim(),
      phone: String(data.get("phone")).trim(),
      organization: String(data.get("organization")).trim(),
      position: String(data.get("position") || "").trim(),
      description: String(data.get("description") || "").trim(),
      membership: String(data.get("membership")),
      timestamp: String(data.get("timestamp"))
    };
    if (!validApplicationReceipt(receipt)) {
      const error = document.querySelector("#form_error");
      error.textContent = "Please complete all required fields with valid information, not only spaces.";
      error.hidden = false;
      return;
    }
    if (!storage.set("sessionStorage", "week_one_chamber_application", JSON.stringify(receipt))) {
      const error = document.querySelector("#form_error");
      error.textContent = "This preview needs temporary browser-tab storage. Allow session storage and try again; no application has been sent.";
      error.hidden = false;
      return;
    }
    // Personal data is never placed in the URL or sent to a server.
    window.location.assign("week_one_chamber_thank_you.html");
});
}

function validApplicationReceipt(receipt) {
  return receipt !== null && typeof receipt === "object" &&
    ["first_name", "last_name", "email", "phone", "organization"].every(key =>
      typeof receipt[key] === "string" && receipt[key].trim().length > 0) &&
    ["Non-profit", "Silver", "Gold"].includes(receipt.membership) &&
    typeof receipt.timestamp === "string" &&
    !Number.isNaN(new Date(receipt.timestamp).getTime());
}

const receiptElement = document.querySelector("#application_receipt");
if (receiptElement) {
  const clearButton = document.querySelector("#clear_application");
  const emptyMessage = receiptElement.innerHTML;
  try {
    const receipt = JSON.parse(storage.get("sessionStorage", "week_one_chamber_application"));
    if (validApplicationReceipt(receipt)) {
      const fields = [
        ["Applicant", `${receipt.first_name} ${receipt.last_name}`],
        ["Organization", receipt.organization],
        ["Email", receipt.email],
        ["Phone", receipt.phone],
        ["Membership", receipt.membership],
        ["Title or position", receipt.position || "Not provided"],
        ["About the organization", receipt.description || "Not provided"],
        ["Application started", new Date(receipt.timestamp).toLocaleString("en-US")]
      ];
      receiptElement.innerHTML = `<dl>${fields.map(([label, value]) =>
        `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>`;
      clearButton.hidden = false;
    } else if (receipt !== null) {
      storage.remove("sessionStorage", "week_one_chamber_application");
      receiptElement.innerHTML = '<p>This preview is incomplete. Please complete the <a href="week_one_chamber_join.html">membership form</a> again.</p>';
    }
  } catch {
    storage.remove("sessionStorage", "week_one_chamber_application");
  }
  clearButton.addEventListener("click", () => {
    storage.remove("sessionStorage", "week_one_chamber_application");
    receiptElement.innerHTML = emptyMessage;
    clearButton.hidden = true;
  });
}
