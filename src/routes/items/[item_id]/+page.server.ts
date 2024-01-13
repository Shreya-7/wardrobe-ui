import { ItemsService, type Item } from "../../../client";
import { getItemFormData, getItemFormModel } from "$lib/itemFormUtils";
import { isEqual } from "lodash";
import { fail, redirect } from "@sveltejs/kit";

let item: Item;

export async function load({ params }) {
    item = await ItemsService.itemsItemIdGetItemsItemIdGet(params.item_id);
    return {
        item: item,
        createFormDropdownValues: getItemFormModel()
    };
}

export const actions = {
    update: async ({ cookies, request }) => {
        const data = await request.formData();
        var inputItem: Item = getItemFormData(data);
        var completeItem = {
            ...{
                "item_id": item.item_id
            }, ...inputItem
        };

        if (isEqual(completeItem, item)) {
            return fail(400, { "message": "No field selected to be updated -_^" })
        }
        await ItemsService.itemsItemIdPutItemsItemIdPut(item.item_id!, inputItem);
        console.log("Successfully updated item: " + item.item_id);
    },
    delete: async ({ cookies, request }) => {
        await ItemsService.itemsItemIdDeleteItemsItemIdDelete(item.item_id!);
        console.log("Successfully deleted item: " + item.item_id);
        // We need to redirect because the form action will cause the page to reload and 
        // call GET /items/item_id which will give a 404 since we (duh) just deleted it
        throw redirect(303, "/items");
    }
};