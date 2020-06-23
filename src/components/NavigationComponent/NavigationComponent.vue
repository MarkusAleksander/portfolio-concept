<template>
    <nav class="navigation">
        <ul class="navigation__list">
            <li v-for="link in links" :key="link.title" class="navigation__list-item">
                <link-item v-bind:link="link"></link-item>
            </li>
        </ul>
    </nav>
</template>
<script>
import LinkItem from "./../LinkItem/LinkItem";

export default {
    components: {
        LinkItem,
    },
    data: () => {
        return {};
    },
    props: ["links", "className"],
};
</script>
