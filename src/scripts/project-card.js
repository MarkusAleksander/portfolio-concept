export default function setupProjectCards() {
    const project_cards = document.querySelectorAll(".project-card");

    function onProjectCardClick(card, e) {
        if (e.target.classList.contains("project-card__tech-list__icon"))
            return;
        e.stopPropagation();
        let is_current_card =
            card === document.querySelector(".project-card.open");
        closeAllCards();
        if (!is_current_card) {
            openCard(card);
        }
    }

    function openCard(card) {
        let pullout = card.querySelector(".project-card__pullout");
        if (!pullout) return;

        let pullout_height = pullout.clientHeight - 25;
        let card_height = card.clientHeight;

        let new_height = card_height + pullout_height;

        card.classList.add("open");
        card.style.height = new_height + "px";

        window.addEventListener("resize", handleOpenCardSize);
    }

    function closeCard(card) {
        let main = card.querySelector(".project-card__main");
        if (!main) return;

        let new_height = main.clientHeight;

        card.classList.remove("open");
        card.style.height = new_height + "px";

        window.removeEventListener("resize", handleOpenCardSize);
    }

    function handleOpenCardSize() {
        let card = document.querySelector(".project-card.open");

        if (!card) return;

        let main_height = card.querySelector(".project-card__main")
            .clientHeight;
        let pullout_height =
            card.querySelector(".project-card__pullout").clientHeight - 25;

        card.style.height = main_height + pullout_height + "px";
    }

    function closeAllCards() {
        let openCards = document.querySelectorAll(".project-card.open");
        for (let i = 0; i < openCards.length; i++) {
            closeCard(openCards[i]);
        }
    }

    function updateCardHeight(card) {
        card.style.height =
            card.querySelector(".project-card__main").clientHeight + "px";
    }

    function updateAllCardHeights() {
        for (let i = 0; i < project_cards.length; i++) {
            let card = project_cards[i];
            if (!card.classList.contains("open")) {
                updateCardHeight(card);
            }
        }
    }

    for (let i = 0; i < project_cards.length; i++) {
        let card = project_cards[i];
        updateCardHeight(card);
        card.addEventListener("click", onProjectCardClick.bind(null, card));
    }
    document.body.addEventListener("click", closeAllCards);
    window.addEventListener("resize", updateAllCardHeights);
}
