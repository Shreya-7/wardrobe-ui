import { type Item, Time, Season, Occasion, ItemsService, type Accessory, type Bottomwear, type Footwear, type Topwear, type SinglePiece, type Underwear } from "../../client";

export async function load() {
    const items: Item[] = await ItemsService.itemsGetItemsGet();
    return { 
        items: items,
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

export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData();
        // TODO model: Remove this any
        const category: any =  data.get('category')?.toString(); 
        var itemToBeCreated: Item = { 
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
        ItemsService.itemsPostItemsPost(itemToBeCreated);
	}
};

function getRequestField(data: FormData, property: string) {
    return data.get(property)?.toString().toLowerCase();
}

function toTitleCase(str: string) {
    let titleCase = "";
    str.split(" ").forEach(word => {
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        titleCase += capitalizedWord + " ";
    });
    return titleCase.trim();
}

type Category = (Accessory | Bottomwear | Footwear | Topwear | SinglePiece | Underwear);