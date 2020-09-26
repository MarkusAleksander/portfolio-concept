export default function setupProjectSlider() {
    // function setupDraggableSliders() {
    let project_slider = document.querySelector(".projects-list__outer");

    let isDown = false,
        startX,
        scrollLeft;

    project_slider.addEventListener("mousedown", function(e) {
        isDown = true;
        project_slider.classList.add("active");
        startX = e.pageX - project_slider.offsetLeft;
        scrollLeft = project_slider.scrollLeft;
    });
    project_slider.addEventListener("mouseleave", function(e) {
        isDown = false;
        project_slider.classList.remove("active");
    });
    project_slider.addEventListener("mouseup", function(e) {
        isDown = false;
        project_slider.classList.remove("active");
    });
    project_slider.addEventListener("mousemove", function(e) {
        if (!isDown) {
            return;
        }
        e.preventDefault();
        let x = e.pageX - project_slider.offsetLeft;
        let walk = x - startX;

        project_slider.scrollLeft = scrollLeft - walk;

        // update_scroll_thumb();
    });
    // }

    // function setupScrollTrack() {
    // let scroll_progress = document.querySelector(
    //     ".project-list__scroll-progress"
    // );

    // let scroll_track = scroll_progress.querySelector(
    //     ".project-list__scroll-progress__track"
    // );
    // let scroll_thumb = scroll_progress.querySelector(
    //     ".project-list__scroll-progress__thumb"
    // );

    // function update_scroll_thumb() {
    //     let result =
    //         (project_slider.scrollLeft /
    //             (project_slider.scrollWidth - project_slider.clientWidth)) *
    //         100;

    //     scroll_thumb.style.left = result + "%";
    // }
}
