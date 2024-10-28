import { ItemsService, type Item } from "../../../../client";
import { getItemFormData, getItemFormModel, hasItemBeenUpdated, uploadImageForItem } from "$lib/itemFormUtils";
import { fail, redirect } from "@sveltejs/kit";
import { USER_ID } from "../../../../constants";

let item: Item;

export async function load({ params }) {
    item = await ItemsService.itemsItemIdGetItemsItemIdGet(params.item_id);
    return {
        item: item,
        createFormDropdownValues: getItemFormModel(),
        // need to send this value back to reset the state of the page after updation
        editMode: false
    };
}

export const actions = {
    update: async ({ cookies, request }) => {
        const data = await request.formData();
        const userId = cookies.get(USER_ID)!;
        try {
            const inputItem: Item = getItemFormData(data, userId);
            // the form does not send back the `item_id`
            const completeItem = {
                ...{ "item_id": item.item_id }, ...inputItem
            };
            // TODO: need to find a better way to do this
            const imageChanged: boolean = !((data.get("image") as File).name === "undefined");
            const itemChanged = hasItemBeenUpdated(completeItem, item);

            if (!itemChanged && !imageChanged) {
                return fail(400, { failure: true, errorMessage: "No field selected to be updated -_^" })
            }

            try {
                if (itemChanged) {
                    await ItemsService.itemsItemIdPutItemsItemIdPut(item.item_id!, inputItem);
                }
                if (imageChanged) {
                    await uploadImageForItem(item, data);
                }
                console.log("Successfully updated item: " + item.item_id);
            }
            catch (err) {
                console.log("Error occured when trying to update item ", err);
                return fail(400, { failure: true, errorMessage: "Some problem has occured :(" })
            }
        } catch (err) {
            console.log("Error thrown when trying to serialise input data to API model ", err);
            return fail(422, { failure: true, errorMessage: "Invalid input data! :/" })
        }
    },
    delete: async ({ cookies, request }) => {
        await ItemsService.itemsItemIdDeleteItemsItemIdDelete(item.item_id!);
        console.log("Successfully deleted item: " + item.item_id);
        // We need to redirect because the form action will cause the page to reload and 
        // call GET /items/item_id which will give a 404 since we (duh) just deleted it
        redirect(303, "/items");
    }
};