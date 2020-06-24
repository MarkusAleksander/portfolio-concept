<template>
    <div id="app" class="app--black-white" ref="app">
        <personal-icon />
        <router-view />
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
    },
};
</script>

<style lang="scss"></style>
