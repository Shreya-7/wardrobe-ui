import { ItemsService, type Item } from "../../../client";

export async function load({ params }) {
    const item: Item = await ItemsService.itemsItemIdGetItemsItemIdGet(params.item_id);
    return { item };
}