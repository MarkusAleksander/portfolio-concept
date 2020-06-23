<template>
    <div class="toolbar bg-gradient bg--white-black" v-bind:class="{ 'open-menu': isOpen }">
        <div class="toolbar__inner blend--difference">
            <div class="toolbar__block toolbar__block--logo">
                <a href="/home" title="Home" class="logo">
                    <span class="logo__content logo__content--icon">M</span>
                    <span class="logo__content logo__content--text">Markus</span>
                </a>
            </div>
            <menu-button class="toolbar__block toolbar__block--btn" v-on:click="toggleToolbar"></menu-button>
            <div class="toolbar__block toolbar__block--main">
                <navigation-component v-bind:links="mainNavLinks"></navigation-component>
            </div>
            <div class="toolbar__block toolbar__block--secondary">
                <navigation-component v-bind:links="secondaryNavLinks"></navigation-component>
            </div>
        </div>
    </div>
</template>
<script>
import MenuButton from "./../MenuButton/MenuButton";
import NavigationComponent from "./../NavigationComponent/NavigationComponent";

export default {
    components: {
        MenuButton,
        NavigationComponent,
    },
    data: () => {
        return {
            isOpen: false,
            mainNavLinks: [
                {
                    title: "Home",
                    img: "/img/home_1391.svg",
                    name: "/",
                    url: "/",
                },
                {
                    title: "About",
                    img: "/img/emoji_happy_518.svg",
                    name: "about",
                    url: "/about",
                },
                {
                    title: "Projects",
                    img: "/img/desktop_232.svg",
                    name: "projects",
                    url: "/projects",
                },
                {
                    title: "Contact",
                    img: "/img/messages_chat_1557.svg",
                    name: "contact",
                    url: "/contact",
                },
            ],
            secondaryNavLinks: [
                {
                    title: "LinkedIn",
                    img: "/img/linkedin_161.svg",
                    name: "linkedin",
                    url: "https://www.linkedin.com",
                },
                {
                    title: "Github",
                    img: "/img/github_142.svg",
                    name: "github",
                    url: "https://www.github.com/MarkusAleksander",
                },
            ],
        };
    },
    methods: {
        toggleToolbar: function() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>
<style></style>
