<template>
    <div class="container container--home">
        <div class="block block--header">
            <h1>
                <span>
                    Hi!
                    <br />I'm Markus
                    <br />Alexander Holden.
                </span>
            </h1>
        </div>
        <div class="block block--preamble">
            <p>
                <span>
                    A Manchester based Frontend Developer focused on writing
                    elegant code and making beautiful and responsive websites.
                </span>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: "HomeContainer",
    props: ["onscrollbuttonclick"],
};
</script>
