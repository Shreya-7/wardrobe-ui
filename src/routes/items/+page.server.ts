import { type Item, Time, Season, Occasion, ItemsService, type Accessory, type Bottomwear, type Footwear, type Topwear, type SinglePiece, type Underwear } from "../../client";
import { getItemFormData, getItemFormModel } from "$lib/itemFormUtils";

let items: Item[];

export async function load() {
    console.log("Fetching all items...");
    // TODO validations: 
    // return fail(401)
    // render similar dismissable alerts on FE
    // saem for the get item page
    items = await ItemsService.itemsGetItemsGet();
    return { 
        items: items,
        createFormDropdownValues: getItemFormModel()
    };
}

export const actions = {
	create: async ({ cookies, request }) => {
        const data = await request.formData();
        // TODO validations: 
        // return fail(422) if the input is unable to get serialised into the API model(for update as well)
        // return fail(x) based on status code returned from backend
        // return success if all good
        // render similar dismissable alerts on FE
        // saem for the update form
        var itemToBeCreated: Item = getItemFormData(data);
        const createdItem: any = await ItemsService.itemsPostItemsPost(itemToBeCreated);
        console.log("Successfully created new item: " + createdItem);
	}
};