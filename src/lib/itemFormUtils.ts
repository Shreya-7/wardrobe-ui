import pkg from 'lodash';
const { isEqual } = pkg;
import { Time, Season, Occasion, Kind, Material, Size, type Item, ItemImagesService } from "../client";
import imageCompression from 'browser-image-compression';

export function getItemFormModel() {
    return {
        // TODO model: figure out how to fetch display name v/s field name
        times: Object.values(Time).map(value => toTitleCase(value)),
        seasons: Object.values(Season).map(value => toTitleCase(value)),
        occasions: Object.values(Occasion).map(value => toTitleCase(value)),
        sizes: Object.values(Size).map(value => value.toUpperCase()),
        materials: Object.values(Material).map(value => toTitleCase(value)),
        // TODO model: pull from spec
        categories: ["tshirt", "shirt", "sweatshirt"].map(value => toTitleCase(value)),
        kinds: Object.values(Kind).map(value => toTitleCase(value))
    }
}

export function getItemFormData(data: FormData, userId: string): Item {
    // TODO model: Remove this any
    const category: any =  data.get('category')?.toString();
    return { 
        name: getRequestField(data, 'name'),
        category: getRequestField(data, 'category') as any,
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

export function getItemFieldName(field: string): string {
    const choicesToFieldMap: { [key: string]: string } = {
        "times": "time",
        "seasons": "season",
        "occasions": "occasion",
        "sizes": "size",
        "materials": "material",
        "categories": "category",
        "kinds": "kind"
    };
    return choicesToFieldMap[field];
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
    
    // Skip upload if no file is provided
    if (!file || file.size === 0) {
        return;
    }
    
    // Upload the image (compression happens client-side before form submission)
    await ItemImagesService.itemsPostItemsItemIdImagesPost(item.item_id!, {
        image_file: file
    });
    console.log("Successfully updated new item with image!");
}

/**
 * Compresses images to max 1MB and 1920px dimensions before upload.
 * Reduces storage costs and improves upload speed. Falls back to original file if compression fails.
 */
export async function compressImage(file: File): Promise<File> {
    console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    
    try {
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: false,
            initialQuality: 0.8
        });
        
        console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compression ratio: ${((1 - compressedFile.size / file.size) * 100).toFixed(1)}%`);
        
        return compressedFile;
    } catch (error) {
        console.error('Error compressing image:', error);
        console.log('Using original file');
        return file;
    }
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