// ==UserScript==
// @name         Prime Gaming hide claimed/not appealing games
// @namespace    https://github.com/maephisto666
// @version      1.1
// @description  Hide claimed/not appealing games on gaming.amazon.com
// @author       Maephisto
// @license      MIT
// @match        *://gaming.amazon.com/
// @match        *://gaming.amazon.com/home*
// @match        *://gaming.amazon.com/?ingress*
// @icon         https://d2u4zldaqlyj2w.cloudfront.net/b5de57e6-cb6b-4c8e-8461-029f631faee4/favicon.ico
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    const gamesToExclude = [
        "Aion",
        "Aion Classic",
        "Apex Legends",
        "Asphalt 9: Legends",
        "Battlefield 2042",
        "Big Farm: Mobile Harvest",
        "Black Desert Mobile",
        "Black Desert Online",
        "Blade & Soul",
        "Blankos Block Party",
        "Bloons TD 6",
        "Brawlers",
        "Brawlhalla",
        "Call of Duty: Mobile",
        "Call of Duty: Warzone and Modern Warfare 2",
        "Call of Duty: Modern Warfare III",
        "Champions Ascension",
        "Company of Heroes 3",
        "Dead by Daylight",
        "Dead Island 2",
        "EA SPORTS FC 24",
        "EA Sports UFC 5",
        "Fall Guys",
        "F1 23",
        "FIFA 23",
        "Forspoken",
        "Gods Unchained",
        "Hearthstone",
        "Hi-Fi RUSH",
        "Honkai: Star Rail",
        "League of Legends",
        "League of Legends: Wild Rift",
        "Legends of Runeterra",
        "Lineage II",
        "Lineage II: Aden",
        "Lineage II: Classic",
        "Lords Mobile",
        "Madden NFL 23",
        "Madden NFL 24",
        "Mojo Melee",
        "Monster Hunter Now",
        "My Pet Hooligan",
        "Naraka: Bladepoint",
        "New World",
        "NFL Rivals",
        "Overwatch 2",
        "Paladins",
        "Partie",
        "Phantasy Star Online 2 New Genesis - Global",
        "PlanetSide 2",
        "Pokémon GO",
        "PUBG MOBILE",
        "PUBG: BATTLEGROUNDS",
        "RAID: Shadow Legends",
        "Risk: Global Domination",
        "Roblox",
        "RuneScape",
        "SMITE",
        "Shadow Fight 3",
        "Star Trek: Timelines",
        "Teamfight Tactics",
        "Time Princess",
        "The Elder Scrolls Online",
        "Tom Clancy's Rainbow Six Siege",
        "Two Point Campus",
        "VALORANT",
        "Warframe",
        "World of Tanks",
        "World of Warships",
        "World of Warships: Legends",
        "banana"
    ]

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                const offers = document.querySelectorAll('.offer-list__content__grid>.tw-block');
                offers.forEach(offer => {
                    // Already claimed games
                    const collectedBtn = offer.querySelector('.tw-c-text-alert-success');

                    // Games to exclude
                    const gameCardDetailsBody = offer.querySelector('.item-card-details__body');
                    let gameName = "";
                    if (gameCardDetailsBody) {
                        gameName = gameCardDetailsBody.firstChild
                    }

                    // If a game was already collected or is in the exclusion list
                    if (collectedBtn || gamesToExclude.includes(gameName.textContent)) {
                        offer.remove();
                    }
                });

                const games = document.querySelectorAll('.offer-list__shoveler')[0].querySelectorAll('.tw-block');
                games.forEach(game => {
                    // Already claimed games
                    const collectedBtn = game.querySelector('.tw-c-text-alert-success');

                    // If a game was already collected
                    if (collectedBtn) {
                        game.remove();
                    }
                });
            }
        });
    });
    observer.observe(document.getElementById("root"), {
        childList: true,
        subtree: true
    });

    GM_addStyle(`
.home > .tw-flex > .tw-placeholder-wrapper,
.prime-root-minimal__alert__container,
.featured-content-banner,
.featured-content-shoveler,
.featured-content,
[data-a-target="offer-section-TOP_PICKS"],
[data-a-target="offer-section-FGWP"],
[data-a-target="offer-section-EXPIRING"],
[data-a-target="offer-section-RECOMMENDED"],
.event-container,
.tw-placeholder-wrapper,
.offer-list__content .swiper-button {
    display: none !important
}
`);

})();