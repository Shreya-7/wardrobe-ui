<script lang="ts">
	import { enhance } from '$app/forms';
    import { compressImage } from '$lib/itemFormUtils';
    import type { Item } from '../../client';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
    import Select from "./custom/Select.svelte";

    export let action: string;
    export let sizes: Array<string>, 
        materials: Array<string>, 
        categories: Array<string>, 
        times: Array<string>, 
        seasons: Array<string>, 
        occasions: Array<string>, 
        kinds: Array<string>;
    export let item: Item | null;

    function getValue(property: keyof Item) {
        let value = null;
        if (item != null && item[property]) {
            value = item[property];
        }
        return value ? value : "";
    }
    
    function isPresentOnItem(property: keyof Item, value: string) {
        let valueOnItem = getValue(property);
        return valueOnItem.toString().toLowerCase() == value.toString().toLowerCase();
    }

    // Default values for new items
    function getDefaultValue(property: keyof Item) {
        if (item != null) {
            return getValue(property);
        }
        
        const defaults: Partial<Record<keyof Item, string>> = {
            category: "tshirt",
            kind: "topwear",
            size: "m",
            material: "cotton",
            time: "day",
            season: "summer",
            occasion: "casual"
        };
        
        return defaults[property] || "";
    }

    let compressedImageFile: File | null = null;
    let selectedImageName: string = "";
    
    // Compress image when user selects a file (client-side, automatic)
    const handleImageSelect = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        
        if (file) {
            selectedImageName = file.name;
            compressedImageFile = await compressImage(file);
        }
    };

    const handleFormSubmit = async ({ formData }: { formData: FormData }) => {
        if (compressedImageFile) {
            console.log('Using compressed image for upload');
            formData.set('image', compressedImageFile);
        }
        
        return async ({ update }: { update: () => Promise<void> }) => {
            await update();
        };
    };
</script>

<Card class="w-full max-w-4xl mx-auto">
    <CardHeader>
        <CardTitle>
            {item ? 'Edit Item' : 'Add Item'}
        </CardTitle>
    </CardHeader>
    
    <CardContent>
        <!--
        In case of editing, we pre-populate the existing values of these fields so that the customer knows the value they are about to change.
        This unfortunately causes us to send the entire Item object to the edit action and to the backend API (which supports piecewise updates).
        -->
        <form method="POST" action="{action}" use:enhance={handleFormSubmit} enctype="multipart/form-data" class="space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <Label for="name">Name *</Label>
                    <Input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value="{getValue('name')}" 
                        placeholder="Item name"
                        required 
                    />
                </div>
                
                <div class="space-y-2">
                    <Label for="image">Image</Label>
                    <!-- TODO: figure out how to display the existing image in case of editing -->
                    <div class="space-y-1">
                        <Input 
                            type="file" 
                            id="image" 
                            name="image" 
                            accept=".jpg, .png, .jpeg" 
                            on:change={handleImageSelect}
                            class="file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium"
                        />
                        {#if selectedImageName}
                            <p class="text-xs text-muted-foreground">Selected: {selectedImageName}</p>
                        {/if}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Select 
                    name="category" 
                    label="Category" 
                    options={categories} 
                    selectedValue={getDefaultValue('category')} 
                    required={true} 
                />

                <Select 
                    name="kind" 
                    label="Kind" 
                    options={kinds} 
                    selectedValue={getDefaultValue('kind')} 
                />

                <Select 
                    name="size" 
                    label="Size" 
                    options={sizes} 
                    selectedValue={getDefaultValue('size')} 
                />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select 
                    name="material" 
                    label="Material" 
                    options={materials} 
                    selectedValue={getDefaultValue('material')} 
                />

                <Select 
                    name="time" 
                    label="Time" 
                    options={times} 
                    selectedValue={getDefaultValue('time')} 
                />

                <Select 
                    name="season" 
                    label="Season" 
                    options={seasons} 
                    selectedValue={getDefaultValue('season')} 
                />

                <Select 
                    name="occasion" 
                    label="Occasion" 
                    options={occasions} 
                    selectedValue={getDefaultValue('occasion')} 
                />
            </div>

            <div class="flex justify-end pt-4">
                <Button type="submit" class="min-w-32">
                    {item ? 'Update' : 'Add Item'}
                </Button>
            </div>
        </form>
    </CardContent>
</Card>