import { type Item, Time, Season, Occasion, ItemsService, type Accessory, type Bottomwear, type Footwear, type Topwear, type SinglePiece, type Underwear, ItemImagesService } from "../../../client";
import { getItemFormData, getItemFormModel, uploadImageForItem } from "$lib/itemFormUtils";
import { fail, redirect } from "@sveltejs/kit";
import { USER_ID } from "../../../constants";

let items: Item[];

export async function load() {
    console.log("Fetching all items...");
    items = await ItemsService.itemsGetItemsGet();
    return {
        items: items,
        createFormDropdownValues: getItemFormModel()
    };
}

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        const userId = cookies.get(USER_ID)!;
        let createdItem = null;
        try {
            const itemToBeCreated: Item = getItemFormData(data, userId);
            try {
                createdItem = await ItemsService.itemsPostItemsPost(itemToBeCreated);
                console.log("Successfully created new item: " + createdItem.item_id);
                await uploadImageForItem(createdItem, data);
            }
            catch (err) {
                console.log("Error occured when trying to create item ", err);
                return fail(400, { failure: true, errorMessage: "Some problem has occured :(" })
            }
        } catch (err) {
            console.log("Error thrown when trying to serialise input data to API model ", err);
            // TODO validations: error messages won't be shown if client-side JS is not enabled
            // user will simply see the all items page without knowing whether the op was a success
            return fail(422, { failure: true, errorMessage: "Invalid input data! :/" })
        }
        // this needs to be outside any catch block as per Svelte docs
        throw redirect(303, "/items/" + createdItem.item_id);
    }
};