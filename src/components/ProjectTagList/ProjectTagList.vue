<template>
    <ul class="project-tag-list">
        <li class="project-tag-list__item" v-for="tag in tags" :key="tag">
            <project-tag :tag="tag"></project-tag>
        </li>
    </ul>
</template>
<script>
import ProjectTag from "./../ProjectTag/ProjectTag";
export default {
    name: "ProjectTagList",
    components: {
        ProjectTag,
    },
    props: ["tags"],
};
</script>