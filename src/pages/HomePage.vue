<template>
    <div class="page page--home bg-gradient bg--black-white">
        <home-container />
        <project-container>
            <div slot="header" class="block blend--difference">
                <h2>Selected Projects</h2>
                <p>Below is a selection of recent work and personal projects</p>
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
};
</script>