<template>
    <div id="app" class="app--black-white" ref="app">
        <router-view />
        <toolbar-component />
    </div>
</template>
<script>
import ToolbarComponent from "./components/ToolbarComponent/ToolbarComponent";

export default {
    components: {
        ToolbarComponent,
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
        }, 0);
        // * setup scroll events
        let app = this.$refs.app;
        app.addEventListener("wheel", (e) => {
            if (this.is_scrolling) return;
            this.is_scrolling = true;
            this.handleScroll(e, "wheel");
        });
        window.addEventListener("keydown", (e) => {
            if (this.is_scrolling) return;
            this.is_scrolling = true;
            this.handleScroll(e, "key");
        });
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
        handleScroll: function(evt, evtType) {
            console.log(evt);
            let direction;
            // -1 == upwards, 1 == downwards
            if (evtType === "wheel") {
                direction = evt.deltaY > 0 ? 1 : -1;
            } else if (evtType === "key") {
                direction =
                    evt.code == "ArrowDown"
                        ? 1
                        : evt.code == "ArrowUp"
                        ? -1
                        : 0;
            } else if (evtType === "drag") {
                // ...
            }
            console.log(direction);
        },
    },
};
</script>

<style lang="scss"></style>
