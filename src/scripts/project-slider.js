export default function setupProjectSlider() {
    function setupDraggableSliders() {
        let project_slider = document.querySelector(".projects-list");

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
        });
    }

    setupDraggableSliders();
}
