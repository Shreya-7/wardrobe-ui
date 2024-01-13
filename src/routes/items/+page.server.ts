import { type Item, Time, Season, Occasion, ItemsService, type Accessory, type Bottomwear, type Footwear, type Topwear, type SinglePiece, type Underwear } from "../../client";
import { getItemFormData, getItemFormModel } from "$lib/itemFormUtils";


let items: Item[];

export async function load() {
    items = await ItemsService.itemsGetItemsGet();
    return { 
        items: items,
        createFormDropdownValues: getItemFormModel()
    };
}

export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData();
        var itemToBeCreated: Item = getItemFormData(data);
        const createdItem: any = ItemsService.itemsPostItemsPost(itemToBeCreated);
        items = [...items, createdItem];
	}
};