import "./sass/main.scss";

// import setupProjectSlider from "./scripts/project-slider.js";
// import setupProjectCards from "./scripts/project-card.js";
import setupPageScroll from "./scripts/page-scroll.js";

// setupProjectSlider();
// setupProjectCards();
setupPageScroll();

let nav_items = document.querySelectorAll(".js-page-scroller");

for (let i = 0; i < nav_items.length; i++) {
    let nav_item = nav_items[i];
    let target = nav_item.getAttribute("data-target");

    nav_item.addEventListener("click", doScrolling.bind(null, target, 1500));
}

let nav_menu_items = document.querySelectorAll(".navigation__link");
let sections = [];
let current_idx = null;
let current_target = null;

for (let i = 0; i < nav_menu_items.length; i++) {
    let nav_menu_item = nav_menu_items[i];
    let target = nav_menu_item.getAttribute("data-target");

    if (target) {
        sections.push(document.querySelector(target));
    }
}

function updateNavHighlight() {

    let target_idx = 0;

    for (let i = 0; i < sections.length; i++) {
        let top = sections[i].getBoundingClientRect().top;
        if (top <= 5) {
            target_idx = i;
        }
    }

    if (current_idx === target_idx) return;

    if (current_target) {
        current_target.classList.remove("active");
    }

    current_target = nav_menu_items[target_idx];

    current_target.classList.add("active");
}

window.addEventListener("scroll", updateNavHighlight);
updateNavHighlight();