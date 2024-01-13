import { ItemsService, type Item } from "../../../client";

let item: Item;

export async function load({ params }) {
    item = await ItemsService.itemsItemIdGetItemsItemIdGet(params.item_id);
    return { item };
}