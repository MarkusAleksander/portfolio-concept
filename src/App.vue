<template>
    <div id="app" class="app--black-white" ref="app">
        <personal-icon />
        <router-view v-on:selectscroll="scrollHandler" />
        <toolbar-component />
    </div>
</template>
<script>
import ToolbarComponent from "./components/ToolbarComponent/ToolbarComponent";
import PersonalIcon from "./components/PersonalIcon/PersonalIcon";

export default {
    components: {
        ToolbarComponent,
        PersonalIcon,
    },
    data: function() {
        return {
            is_scrolling: false,
        };
    },
    mounted: function() {
        // * mock a timeout
        window.setTimeout(() => {
            window.hideLoadingOverlay(this.onLoaded);
        }, 500);
    },
    methods: {
        onLoaded: function() {
            let app = this.$refs.app;
            app.classList.add("is-loading");
            window.setTimeout(() => {
                app.classList.add("is-loaded");
                app.classList.remove("is-loading");
            }, 1200);
        },
        scrollHandler: function(data) {
            const el = this.$refs.app;
            const { to, duration } = data;
            const start = el.scrollTop,
                target = to.getBoundingClientRect().top,
                increment = 10;
            let currentTime = 0;

            if (!Math.easeInOutQuad) {
                Math.easeInOutQuad = function(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return (c / 2) * t * t + b;
                    t--;
                    return (-c / 2) * (t * (t - 2) - 1) + b;
                };
            }

            const animateScroll = function() {
                currentTime += increment;
                const val = Math.easeInOutQuad(
                    currentTime,
                    start,
                    target,
                    duration
                );
                el.scrollTo(0, val);
                if (currentTime < duration) {
                    window.setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        },
    },
};
</script>

<style lang="scss"></style>
