<template>
    <router-link
        :to="link.url"
        v-bind:title="link.title"
        class="navigation__link"
    >
        <img
            class="navigation__content navigation__content--icon"
            v-bind:src="link.img"
            width="20px"
        />
        <span class="navigation__content navigation__content--text">{{
            link.title
        }}</span>
    </router-link>
</template>
<script>
export default {
    data: () => {
        return {};
    },
    props: ["link"],
};
</script>
