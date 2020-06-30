<template>
    <div class="page page--home">
        <home-container :onscrollbuttonclick="scrollButtonHandler" />
        <project-container ref="project_container">
            <div slot="header" class="block">
                <h2>Selected Projects</h2>
                <p>
                    Below is a selection of recent work
                    <br />and personal projects
                </p>
            </div>
        </project-container>
    </div>
</template>
<script>
import HomeContainer from "./../containers/HomeContainer";
import ProjectContainer from "./../containers/ProjectContainer";

export default {
    components: {
        HomeContainer,
        ProjectContainer,
    },
    methods: {
        scrollButtonHandler: function() {
            this.$emit("selectscroll", {
                to: this.$refs.project_container.$el,
                duration: 1500,
            });
        },
    },
};
</script>