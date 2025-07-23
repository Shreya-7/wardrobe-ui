<script lang="ts">
    import ItemForm from "$lib/components/ItemForm.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";
    import AttributeItem from "$lib/components/custom/AttributeItem.svelte";

    export let data;
    export let form;
    $: item = data.item;
    $: editMode = data.editMode;

    function turnOnEditMode() {
        editMode = true;
    }
</script>

<div class="container mx-auto px-4 py-6">
    {#if !editMode }
        <div class="max-w-4xl mx-auto space-y-6">
            <div class="flex items-center space-x-4">
                <a href="/items">
                    <Button variant="outline" size="sm">
                        ← Back
                    </Button>
                </a>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="space-y-4">
                    <Card>
                        <CardContent class="p-0">
                            <div class="aspect-square relative bg-muted rounded-lg overflow-hidden">
                                {#if item.image}
                                    <img 
                                        src="{item.image}" 
                                        alt="{item.name}"
                                        class="w-full h-full object-cover"
                                    />
                                {:else}
                                    <div class="w-full h-full flex items-center justify-center">
                                        <div class="h-16 w-16 bg-muted-foreground/20 rounded"></div>
                                    </div>
                                {/if}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div class="space-y-6">
                    <div>
                        <h1 class="text-3xl font-bold tracking-tight mb-2">{item.name}</h1>
                        <div class="flex items-center space-x-2 mb-4">
                            <Badge variant="default" class="text-sm">
                                {item.category}
                            </Badge>
                            {#if item.kind}
                                <Badge variant="secondary" class="text-sm">
                                    {item.kind}
                                </Badge>
                            {/if}
                        </div>
                    </div>

                    <Separator />

                    <Card>
                        <CardHeader>
                            <CardTitle class="text-lg">Details</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="grid grid-cols-2 gap-4">
                                <AttributeItem label="Size" value={item.size} />
                                <AttributeItem label="Material" value={item.material} />
                                <AttributeItem label="Season" value={item.season} />
                                <AttributeItem label="Occasion" value={item.occasion} />
                                <AttributeItem label="Time" value={item.time} />
                            </div>

                            {#if item.tags || item.colors}
                                <Separator />
                            {/if}
                            
                            <AttributeItem label="Tags" value={item.tags} fullWidth={true} />
                            <AttributeItem label="Colors" value={item.colors} fullWidth={true} />
                        </CardContent>
                    </Card>

                    <div class="flex items-center space-x-3">
                        <Button on:click={turnOnEditMode}>
                            Edit
                        </Button>
                        
                        <form method="POST" action="?/delete" class="inline">
                            <Button type="submit" variant="destructive">
                                Delete
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <div class="max-w-4xl mx-auto space-y-6">
            <div class="flex items-center justify-between">
                <Button on:click={() => editMode = false} variant="outline" size="sm">
                    ← Cancel
                </Button>
            </div>

            {#if form?.failure}
                <Card class="border-destructive">
                    <CardContent class="pt-6">
                        <p class="text-sm text-destructive">{form?.errorMessage}</p>
                    </CardContent>
                </Card>
            {/if}

            <ItemForm 
                action="?/update" 
                sizes={data.createFormDropdownValues.sizes}
                materials={data.createFormDropdownValues.materials}
                categories={data.createFormDropdownValues.categories}
                times={data.createFormDropdownValues.times}
                seasons={data.createFormDropdownValues.seasons}
                occasions={data.createFormDropdownValues.occasions}
                kinds={data.createFormDropdownValues.kinds}
                item={item}
            />
        </div>
    {/if}
</div>
