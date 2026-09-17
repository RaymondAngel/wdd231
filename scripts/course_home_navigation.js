// Course-home navigation only. No chamber scripts are used.
"use strict";
const courseMenuButton = document.querySelector("#menu_button");
const courseNavigation = document.querySelector("#course_navigation");
if (courseMenuButton && courseNavigation) {
  document.documentElement.classList.add("course-menu-enabled");
  courseMenuButton.hidden = false;
  function setCourseMenu(open) {
    courseNavigation.classList.toggle("is-open", open);
    courseMenuButton.setAttribute("aria-expanded", String(open));
    courseMenuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    courseMenuButton.querySelector(".hamburger").textContent = open ? "×" : "☰";
  }
  courseMenuButton.addEventListener("click", () => {
    setCourseMenu(courseMenuButton.getAttribute("aria-expanded") !== "true");
  });
  courseNavigation.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setCourseMenu(false);
      courseMenuButton.focus();
    }
  });
  // Reset mobile state when crossing into the horizontal desktop layout.
  const courseWideScreen = window.matchMedia("(min-width: 700px)");
  courseWideScreen.addEventListener("change", () => setCourseMenu(false));
}

