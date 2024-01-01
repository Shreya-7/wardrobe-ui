import { ItemsService, type Item } from "../../client";

export async function load() {
    const items: Item[] = await ItemsService.itemsGetItemsGet();
    return { items };
}