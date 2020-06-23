<template>
    <div id="app" class="app--black-white">
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
};
</script>

<style lang="scss"></style>
