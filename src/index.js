import "./sass/main.scss";

// import setupProjectSlider from "./scripts/project-slider.js";
// import setupProjectCards from "./scripts/project-card.js";
import setupPageScroll from "./scripts/page-scroll.js";
import starryBackground from "./scripts/starry-background.js";

starryBackground.startRendering(10);

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

// * -- * //
function prepareForWobblyText(selector) {
    // * select all targets to wobble
    let targets = document.querySelectorAll(selector);

    // * loop through targets
    for (let i = 0; i < targets.length; i++) {
        setupWobblyText(targets[i]);
    }
}

function setupWobblyText(target) {
    // * prepare text into spans so they can be wobbled
    let chars = [...target.innerText];
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] == "\n") {
            chars[i] = "<br />";
        } else if (chars[i] == " ") {
            chars[i] = "<span>&nbsp;</span>";
        } else {
            chars[i] = "<span>" + chars[i] + "</span>";
        }
    }

    // * join them together and reinsert
    target.innerHTML = chars.join("");

    let num_spans = target.children.length;
    let time_till_wobble = getTimeTillNextWobble();
    let timeout_id = null;

    let set_wobble_timeout = function () {
        let target_wobbler = target.children[Math.floor(Math.random() * num_spans)];

        doWobble(target_wobbler);

        timeout_id = setTimeout(
            set_wobble_timeout,
            time_till_wobble
        );

        time_till_wobble = getTimeTillNextWobble();
    };

    set_wobble_timeout();

    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "hidden") {
            clearTimeout(timeout_id);
        } else {
            set_wobble_timeout();
        }
    });
}

function doWobble(el) {
    el.addEventListener("animationend", removeWobblerClass);
    el.classList.add("do-wobble");
}

function removeWobblerClass() {
    this.classList.remove("do-wobble");
    this.removeEventListener("animationend", removeWobblerClass);
}

function getTimeTillNextWobble() {
    return Math.floor(Math.random() * (4 - 1) + 1) * 1000;
}

prepareForWobblyText(".js-wobble");