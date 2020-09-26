import "./sass/main.scss";

import setupProjectSlider from "./scripts/project-slider.js";
import setupProjectCards from "./scripts/project-card.js";
import setupPageScroll from "./scripts/page-scroll.js";

setupProjectSlider();
setupProjectCards();
setupPageScroll();

let nav_items = document.querySelectorAll(".toolbar .js-page-scroller");

for (let i = 0; i < nav_items.length; i++) {
    let nav_item = nav_items[i];
    let target = nav_item.getAttribute("data-target");

    nav_item.addEventListener("click", doScrolling.bind(null, target, 1500));
}
