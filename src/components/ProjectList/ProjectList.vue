<template>
    <ul class="project-list">
        <li v-for="project in projects" :key="project.id" class="project-list__item">
            <project-card :project="project"></project-card>
        </li>
    </ul>
</template>
<script>
import ProjectCard from "./../ProjectCard/ProjectCard";
export default {
    name: "ProjectList",
    components: {
        ProjectCard,
    },
    props: ["projects"],
};
</script>