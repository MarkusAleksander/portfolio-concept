<template>
    <div id="app" ref="app">
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
            has_scrolled_away_from_top: false,
        };
    },
    mounted: function() {
        // * mock a timeout
        window.setTimeout(() => {
            window.hideLoadingOverlay(this.onLoaded);
        }, 1500);
    },
    methods: {
        onLoaded: function() {
            let app = this.$refs.app;
            app.classList.add("is-loading");
            window.setTimeout(() => {
                app.classList.add("is-loaded");
                app.classList.remove("is-loading");
            }, 1200);
            app.addEventListener("scroll", this.scrollHandler);
        },
        scrollHandler: function() {
            let app = this.$refs.app;
            if (!this.has_scrolled_away_from_top && app.scrollTop > 10) {
                app.classList.add("move-headline");
                app.classList.add("show-preamble");
                this.has_scrolled_away_from_top = true;
            } else if (this.has_scrolled_away_from_top && app.scrollTop < 10) {
                app.classList.remove("move-headline");
                app.classList.remove("show-preamble");
                this.has_scrolled_away_from_top = false;
            }

            if (app.scrollTop >= window.innerHeight) {
                app.classList.add("sideline-intro");
                app.classList.remove("move-headline");
                app.classList.remove("show-preamble");
            } else if (app.scrollTop < window.innerHeight) {
                app.classList.add("move-headline");
                app.classList.add("show-preamble");
                app.classList.remove("sideline-intro");
            }
        },
    },
};
</script>

<style lang="scss"></style>
