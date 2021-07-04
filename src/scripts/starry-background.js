const starryBackground = (function () {

    // * night sky
    const backgroundColor = "#111111";
    // * dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;
    // * canvas selector
    const canvas = document.querySelector("#starry-background");
    // * context
    const ctx = canvas.getContext("2d");
    // * set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // * mouse area of interaction
    const mouse_radius = 40;
    const push_factor = 5;

    // frame counter
    let counter = 0;

    // * list of stars
    const stars = [];
    // * set max star radius
    const maxStarRadius = 1.5;
    // * set spacing between stars
    const spacing = 50;
    // * star opacity value range
    const minStarOpacity = 0.2;
    const maxStarOpacity = 0.9;
    // * random star colour factor between 0 and 1
    const random_color_factor = 0.15;

    // * star speed factor
    const star_speed = 1.2;

    const base_star_colour = {
        r: 255,
        g: 255,
        b: 255,
    }

    // * get random int
    function randomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomDir() {
        return (Math.round((Math.random() * ((1 * star_speed) - (-1 * star_speed)) + (-1 * star_speed)) * 100)) / 100;
    }

    // * create star list function
    function createStars(width, height, spacing) {
        for (let x = 0; x < width; x += spacing) {
            for (let y = 0; y < height; y += spacing) {
                const star = {
                    id: `${x}.${y}`,
                    x: x + randomInt(spacing),
                    y: y + randomInt(spacing),
                    r: Math.random() * maxStarRadius,
                    col: randomInt(100) <= (random_color_factor * 100) ? {
                        r: randomInt(255),
                        g: randomInt(255),
                        b: randomInt(255)
                    } : base_star_colour,
                    dx: getRandomDir(),
                    dy: getRandomDir()
                };
                stars.push(star);
            }
        }
    }

    function findInfluencedStars({ mouseX, mouseY }) {
        return stars.filter((star) => {
            return (
                ((star.x > mouseX - mouse_radius) && (star.x < mouseX + mouse_radius))
                &&
                ((star.y > mouseY - mouse_radius) && (star.y < mouseY + mouse_radius))
            );
        });
    }

    // * fill circle function
    function fillCircle({ ctx, x, y, r, fillStyle }) {
        ctx.beginPath();
        ctx.fillStyle = fillStyle;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    // * get opacity function
    function getOpacity(factor) {
        const opacityIncrement =
            (maxStarOpacity - minStarOpacity) * Math.abs(Math.sin(factor));
        const opacity = minStarOpacity + opacityIncrement;
        return opacity;
    }

    function onResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // * recreate stars
        stars.length = 0;
        createStars(width, height, spacing);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    function onMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        let influenced_stars = findInfluencedStars({
            mouseX,
            mouseY,
        });

        for (let i = 0; i < influenced_stars.length; i++) {
            let star = influenced_stars[i];
            if (star.x < mouseX) {
                star.x = star.x - push_factor;
            } else {
                star.x = star.x + push_factor;
            }

            if (star.y < mouseY) {
                star.y = star.y - push_factor;
            } else {
                star.y = star.y + push_factor;
            }

            // * clean up star if pushed off screen - these are now returned to the other side
            // if ((star.x < 0 || star.x > width) || (star.y < 0 || star.y > height)) {
            //     star_idx = stars.findIndex(s => s.id === star.id);
            //     stars.splice(star_idx, 1);
            // }
        }
    }

    window.addEventListener("mousemove", onMouseMove);

    // * Rendering
    var stop = false;
    var frameCount = 0;
    var fps, fpsInterval, startTime, now, then, elapsed;

    function render() {

        // request another frame
        requestAnimationFrame(render);

        // calc elapsed time since last loop
        now = Date.now();
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame
        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            then = now - (elapsed % fpsInterval);

            // * fill background
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);

            // * loop through stars and draw
            stars.forEach(function (star, i) {
                // factor will be a different number for every star
                // update star position
                star.x = star.x + star.dx;
                star.y = star.y + star.dy;

                if(star.x > width) {
                    star.x = 0;
                }
                if(star.x < 0) {
                    star.x = width;
                }
                if (star.y > height) {
                    star.y = 0;
                }
                if (star.y < 0) {
                    star.y = height;
                }

                fillCircle({
                    ctx,
                    x: star.x,
                    y: star.y,
                    r: star.r,
                    fillStyle: `rgba(${star.col.r}, ${star.col.g}, ${star.col.b}, ${getOpacity(counter * i)}`
                });
            });
            counter++;
        }
    }

    function startRendering(fps) {
        // * generate the stars
        createStars(width, height, spacing);

        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;

        // * start the render loop
        render();
    }

    // Begin
    // startRendering(10);

    return {
        startRendering
    }

})();

export default starryBackground;