import "./sass/main.scss";
import GSAP from "gsap";
import { ScrollToPlugin } from "gsap/all";

// GSAP.registerPlugin(ScrollTrigger);
GSAP.registerPlugin(ScrollToPlugin);

window.gsap = GSAP;

var intro_tl = GSAP.timeline();

intro_tl
    .to(".block--header", {
        duration: 1.5,
        ease: "power3.out",
        left: "33%",
    })
    .to(".block--preamble p", {
        duration: 1.5,
        ease: "power2.out",
        y: "0%",
    });

// * slides

// const slides = GSAP.utils.toArray(".section");
// const container = document.querySelector("#app");
// let offsets = [];
// let old_slide = 0;
// let new_slide = 0;
// let active_slide = 0;

var activeSlide = 0;
var oldSlide = 0;
var slides = GSAP.utils.toArray(".section");
var container = document.querySelector("#app");
var inner_scrollables = document.querySelectorAll(".inner-scrollable");
var tl;

const snap_points = [];

let total_width = slides.reduce(function(acc, cur, idx) {
    let width = slides[idx].clientWidth;
    let slide_width = acc + width;
    snap_points[idx] = {
        start: acc,
        end: slide_width,
    };
    return slide_width;
}, 0);
container.style.width = total_width + "px";
console.log(snap_points);
console.log(total_width);

function slideAnim(e) {
    // if the container is animating the wheel won't work
    if (tl && tl.isActive()) {
        return;
    }

    // * determine if we're are at beginning or end of current slide

    // * get direction where 1 is down / right and -1 is up / left
    // let dir = e.deltaY >= 0 ? 1 : -1;

    // if (dir === 1) {
    //     // * rightwards movement, ensure we are end of current slide
    // }

    // temp variable to see if we're at the beginning or end
    oldSlide = activeSlide;
    // which way did we scroll the mousewheel
    activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
    // are we at the beginning of the slides?
    activeSlide = activeSlide < 0 ? 0 : activeSlide;
    // are we at the end of the slides?
    activeSlide =
        activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
    // if at the beginning or end there is nothing to animate
    if (oldSlide === activeSlide) {
        return;
    }
    // if not at the beginning or end, we can animate the container
    // and the targets to the new position
    tl = GSAP.timeline();

    let target_percent = (100 / total_width) * snap_points[activeSlide].start;

    console.log(activeSlide);
    console.log(target_percent);

    tl.to(container, 0.4, { xPercent: target_percent * -1 });
}

function getScrollPercent(el) {
    return Math.round(
        (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100
    );
}

function innerScroll(e) {
    if (!event.deltaY) return;

    // * get current pos

    let change = this.scrollLeft + event.deltaY;

    GSAP.to(this, {
        duration: 0.2,
        scrollTo: { x: change },
        onComplete: () => {
            let newPos = getScrollPercent(this);
            gsap.to(".custom-scroller__thumb", {
                duration: 0.5,
                left: newPos + "%",
            });
        },
    });

    e.stopPropagation();
    e.preventDefault();
}

container.addEventListener("wheel", slideAnim);
inner_scrollables.forEach(function(scrollable) {
    scrollable.addEventListener("wheel", innerScroll.bind(scrollable));
});
