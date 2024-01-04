import { ItemsService, type Item, Accessory, Bottomwear, Footwear, SinglePiece, Topwear, Underwear, Time, Season, Occasion } from "../client";

export async function load() {
    return {
        createFormDropdownValues: {
            times: Object.values(Time).map(value => toTitleCase(value)),
            seasons: Object.values(Season).map(value => toTitleCase(value)),
            occasions: Object.values(Occasion).map(value => toTitleCase(value)),
            // TODO model: convert to enum keys
            sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
            materials: ["Cotton", "Jute", "Wool", "Silk"],
            categories: ["Sarees", "Dresses", "Kurtis"]
        }
    };
}

function toTitleCase(str: string) {
    let titleCase = "";
    str.split(" ").forEach(word => {
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        titleCase += capitalizedWord + " ";
    });
    return titleCase.trim();
}
