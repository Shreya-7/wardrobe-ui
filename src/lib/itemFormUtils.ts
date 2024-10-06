import pkg from 'lodash';
const { isEqual } = pkg;
import { Time, Season, Occasion, Kind, Material, Size, type Item, ItemImagesService } from "../client";

export function getItemFormModel() {
    return {
        // TODO model: figure out how to fetch display name v/s field name
        times: Object.values(Time).map(value => toTitleCase(value)),
        seasons: Object.values(Season).map(value => toTitleCase(value)),
        occasions: Object.values(Occasion).map(value => toTitleCase(value)),
        sizes: Object.values(Size).map(value => toTitleCase(value)),
        materials: Object.values(Material).map(value => toTitleCase(value)),
        // TODO model: pull from spec
        categories: ["tshirt", "shirt", "sweatshirt"],
        kinds: Object.values(Kind).map(value => toTitleCase(value))
    }
}

export function getItemFormData(data: FormData, userId: string): Item {
    // TODO model: Remove this any
    const category: any =  data.get('category')?.toString();
    return { 
        name: getRequestField(data, 'name'),
        category: category,
        size: getRequestField(data, 'size') as Size,
        material: getRequestField(data, 'material') as Material,
        time: getRequestField(data, 'time') as Time,
        season: getRequestField(data, 'season') as Season,
        occasion: getRequestField(data, 'occasion') as Occasion,
        tags: [],
        // TODO: remove this, added because Item has this as null by default but the form doesn't support this field yet
        colors: null,
        kind: getRequestField(data, 'kind') as Kind,
        user_id: userId
    };
}

export function getRequestField(data: FormData, property: string, lowercase: boolean = true) {
    let value = data.get(property)?.toString()
    if (lowercase) {
        value = value?.toLowerCase();
    }
    return value;
}

export function toTitleCase(str: string): string {
    let titleCase = "";
    str.split(" ").forEach(word => {
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        titleCase += capitalizedWord + " ";
    });
    return titleCase.trim();
}

export async function uploadImageForItem(item: Item, data: FormData) {
    const file: File = data.get("image") as File;
    await ItemImagesService.itemsPostItemsItemIdImagesPost(item.item_id!, {
        image_file: file
    });
    console.log("Successfully updated new item with image!");
}

// We need to compare without images because the existing image is a string (URL) and the new image is a File object
export function hasItemBeenUpdated(oldItem: Item, newItem: Item) {
    function getItemWithoutImage(item: Item) {
        const { image, ...itemWithoutImage } = item;
        return itemWithoutImage;
    }
    const oldItemWithoutImage = getItemWithoutImage(oldItem);
    const newItemWithoutImage = getItemWithoutImage(newItem);

    return !isEqual(oldItemWithoutImage, newItemWithoutImage);
}