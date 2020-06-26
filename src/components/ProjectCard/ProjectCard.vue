<template>
    <div class="project-card" :style="style">
        <img class="project-card__image" :src="project.image" />
        <div class="project-card__content">
            <project-tag-list :tags="project.tags"></project-tag-list>
            <h3 class="blend--difference">{{ project.title }}</h3>
        </div>
    </div>
</template>
<script>
import ProjectTagList from "./../ProjectTagList/ProjectTagList";
export default {
    name: "ProjectCard",
    components: {
        ProjectTagList,
    },
    props: ["project"],
    computed: {
        style: function() {
            return { "background-color": this.project.background_color };
        },
    },
};
</script>