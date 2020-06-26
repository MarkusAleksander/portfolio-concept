<template>
    <div class="container container--project">
        <slot name="header"></slot>
        <project-list :projects="projects"></project-list>
    </div>
</template>
<script>
import ProjectList from "./../components/ProjectList/ProjectList";
export default {
    name: "ProjectContainer",
    components: {
        ProjectList,
    },
    data: function() {
        return {
            projects: [
                {
                    id: 1,
                    title: "Joanne McClung",
                    background_color: "#235d7b",
                    url: "/project/samework",
                    tags: ["VueJS", "Laravel", "SCSS", "React"],
                },
                {
                    id: 2,
                    title: "Music Library App",
                    background_color: "#e04d36",
                    url: "/project/samework",
                    tags: ["React", "Bulma", "Firebase", "Netlify"],
                },
                {
                    id: 3,
                    title: "Samework",
                    background_color: "#7ad4cb",
                    url: "/project/samework",
                    tags: ["HTML", "CSS", "JS"],
                },
                {
                    id: 4,
                    title: "Game Engine",
                    background_color: "#f9edde",
                    url: "/project/samework",
                    tags: ["ThreeJS"],
                },
                {
                    id: 5,
                    title: "Countdown Timer",
                    background_color: "#0e294c",
                    url: "/project/samework",
                    tags: ["JS"],
                },
                {
                    id: 6,
                    title: "Blackjack",
                    background_color: "#f9f9f9",
                    url: "/project/samework",
                    tags: ["JS"],
                },
            ],
        };
    },
};
</script>