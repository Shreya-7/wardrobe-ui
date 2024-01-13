import { Time, Season, Occasion } from "../client";

export function getItemFormModel() {
    return {
        times: Object.values(Time).map(value => toTitleCase(value)),
        seasons: Object.values(Season).map(value => toTitleCase(value)),
        occasions: Object.values(Occasion).map(value => toTitleCase(value)),
        // TODO model: convert to enum keys
        sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
        materials: ["Cotton", "Jute", "Wool", "Silk"],
        categories: ["Sarees", "Dresses", "Kurtis"]
    }
}

export function getItemFormData(data: FormData) {
    // TODO model: Remove this any
    const category: any =  data.get('category')?.toString();
    return { 
        name: getRequestField(data, 'name'),
        image: getRequestField(data, 'image'),
        category: category,
        size: getRequestField(data, 'size'),
        material: getRequestField(data, 'material'),
        time: getRequestField(data, 'time') as Time,
        season: getRequestField(data, 'season') as Season,
        occasion: getRequestField(data, 'occasion') as Occasion,
        tags: [],
        colors: [],
        // TODO auth: fetch user_id from cookie
        user: "3dff0fe5-e157-4d90-9787-78c1a6e6c470"
    };
}

export function getRequestField(data: FormData, property: string, lowercase: boolean = true) {
    let value = data.get(property)?.toString()
    if (lowercase) {
        value = value?.toLowerCase();
    }
    return value;
}

export function toTitleCase(str: string) {
    let titleCase = "";
    str.split(" ").forEach(word => {
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        titleCase += capitalizedWord + " ";
    });
    return titleCase.trim();
}