<script lang="ts">
    import ItemForm from "$lib/components/ItemForm.svelte";
    import { getItemFieldName } from "$lib/itemFormUtils";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import { Collapsible, CollapsibleContent } from "$lib/components/ui/collapsible";
    
    export let data;
    export let form;
    
    interface SelectedFilters {
        [key: string]: Array<string>;
    }

    let selectedFilters: SelectedFilters;
    $: selectedFilters = {};

    $: displayItems = data.items;

    let showCreateForm = false;
    let showFilters = false;
    let searchQuery = "";

    function updateDisplayItems() {
        let filtered = data.items;
        
        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter((item: any) => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.kind.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // Filter by selected filters
        filtered = filtered.filter((item: any) => {
            for (const key in selectedFilters) {
                if (selectedFilters[key].length === 0) {
                    continue;
                }
                if (!(selectedFilters[key].includes(item[getItemFieldName(key)]))) {
                    return false;
                }
            } 
            return true;
        });
        
        displayItems = filtered;
    }

    function handleFilterSelection(event: Event) {
        const target = event.target as HTMLInputElement;
        const { name, value, checked } = target;
        if (checked) {
            if (!selectedFilters[name]) {
                selectedFilters[name] = [value];
            } else {
                selectedFilters[name].push(value);
            }
        } else {
            selectedFilters[name] = selectedFilters[name].filter(existingValue => existingValue != value);
        }
        updateDisplayItems();
    }

    function handleSearchInput(event: Event) {
        const target = event.target as HTMLInputElement;
        searchQuery = target.value;
        updateDisplayItems();
    }

    function getActiveFilterCount() {
        let count = 0;
        for (const key in selectedFilters) {
            count += selectedFilters[key].length;
        }
        return count;
    }
</script>

<div class="container mx-auto px-4 py-6 space-y-6">
    
    <div class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
            <h1 class="text-3xl font-bold tracking-tight">Wardrobe</h1>
        </div>
        
        <div class="flex items-center space-x-2">
            <Button on:click={() => showFilters = !showFilters} variant="outline">
                Filters
                {#if getActiveFilterCount() > 0}
                    <Badge variant="secondary" class="ml-1">{getActiveFilterCount()}</Badge>
                {/if}
            </Button>
            
            <Button on:click={() => showCreateForm = !showCreateForm}>
                Add Item
            </Button>
        </div>
    </div>

    <Card>
        <CardContent class="pt-6">
            <Input 
                placeholder="Search items..." 
                on:input={handleSearchInput}
            />
        </CardContent>
    </Card>

    {#if form?.failure}
        <Card class="border-destructive">
            <CardContent class="pt-6">
                <p class="text-sm text-destructive">{form?.errorMessage}</p>
            </CardContent>
        </Card>
    {/if}

    <Collapsible bind:open={showCreateForm}>
        <CollapsibleContent>
            <div class="space-y-4">
                <ItemForm 
                    action="?/create" 
                    sizes={data.createFormDropdownValues.sizes}
                    materials={data.createFormDropdownValues.materials}
                    categories={data.createFormDropdownValues.categories}
                    times={data.createFormDropdownValues.times}
                    seasons={data.createFormDropdownValues.seasons}
                    occasions={data.createFormDropdownValues.occasions}
                    kinds={data.createFormDropdownValues.kinds}
                    item={null}
                />
            </div>
        </CollapsibleContent>
    </Collapsible>

    <Collapsible bind:open={showFilters}>
        <CollapsibleContent>
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {#each Object.entries(data.createFormDropdownValues) as [category, options]}
                            <div class="space-y-3">
                                <h4 class="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                                    {category}
                                </h4>
                                <div class="space-y-2">
                                    {#each options as option}
                                        <label class="flex items-center space-x-2 text-sm cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                name="{category.toLowerCase()}" 
                                                value="{option.toLowerCase()}" 
                                                on:change={handleFilterSelection}
                                                class="rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>
                </CardContent>
            </Card>
        </CollapsibleContent>
    </Collapsible>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {#each displayItems as item, index}
            <a href="/items/{item.item_id}" class="group">
                <Card class="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                    <div class="aspect-square relative bg-muted">
                        {#if item.image}
                            <img 
                                src="{item.image}" 
                                alt="{item.name}"
                                class="w-full h-full object-cover"
                            />
                        {:else}
                            <div class="w-full h-full flex items-center justify-center">
                                <div class="h-12 w-12 bg-muted-foreground/20 rounded"></div>
                            </div>
                        {/if}
                    </div>
                    <CardContent class="p-4">
                        <h3 class="font-medium text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                            {item.name}
                        </h3>
                        <div class="flex items-center space-x-1 mb-2">
                            <Badge variant="secondary" class="text-xs">
                                {item.category}
                            </Badge>
                            {#if item.kind}
                                <Badge variant="outline" class="text-xs">
                                    {item.kind}
                                </Badge>
                            {/if}
                        </div>
                        <div class="flex flex-wrap gap-1">
                            {#if item.size}
                                <span class="text-xs text-muted-foreground">Size: {item.size}</span>
                            {/if}
                        </div>
                    </CardContent>
                </Card>
            </a>
        {:else}
            <div class="col-span-full">
                <Card>
                    <CardContent class="pt-6">
                        <div class="text-center space-y-2">
                            <h3 class="text-lg font-medium">No items found</h3>
                            <p class="text-muted-foreground">
                                {searchQuery || getActiveFilterCount() > 0 
                                    ? 'Try adjusting your search or filters.' 
                                    : 'Add your first item to get started.'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        {/each}
    </div>
</div>

<style>
    .line-clamp-1 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
</style>
