<script lang="ts">
    import ItemForm from "$lib/components/ItemForm.svelte";
    import { getItemFieldName } from "$lib/itemFormUtils";
    export let data;
    export let form;
    interface SelectedFilters {
        [key: string]: Array<string>;
    }

    let selectedFilters: SelectedFilters;
    $: selectedFilters = {};

    $: displayItems = data.items;

    function updateDisplayItems() {
        displayItems = data.items.filter(item => {
            for (const key in selectedFilters) {
                if (selectedFilters[key].length === 0) {
                    return true;
                }
                if (!(selectedFilters[key].includes(item[getItemFieldName(key)]))) {
                    return false;
                }
            } 
            return true;
        });
    }

    function handleFilterSelection(event: { target: { name: any; value: any; checked: any; }; }) {
        const { name, value, checked } = event.target;
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
</script>

<style>
    .card:hover{
        transform: scale(1.02);
        box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
    }
</style>

<div class="container">
    <button class="btn btn-primary mb-3" type="button" data-toggle="collapse" data-target="#createItemForm" aria-expanded="false" aria-controls="createItemForm">
        Create item
    </button>
    <div class="collapse mb-3" id="createItemForm">
        {#if form?.failure}
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <span>{form?.errorMessage}</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        {/if}
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

    <button class="btn btn-primary mb-3" type="button" data-toggle="collapse" data-target="#filterCollapse" aria-expanded="false" aria-controls="filterCollapse">
        Filters
    </button>
    <div class="collapse mb-3" id="filterCollapse">
        <form>
            <div class="card-columns">
                {#each Object.entries(data.createFormDropdownValues) as [category, options]}
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{category}</h5>
                        <p class="card-text">
                            {#each options as option}
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="{category.toLowerCase()}" value="{option.toLowerCase()}" id="{option}" on:change={handleFilterSelection}>
                                    <label class="form-check-label" for="{option}">{option}</label>
                                </div>
                            {/each}
                        </p>
                    </div>
                </div>
                {/each}
            </div>
        </form>
    </div>
</div>

<div class="card-columns">
    {#each Object.entries(displayItems) as [index, item]}
    <a href="/items/{item.item_id}">
        <div class="card">
            <img class="card-img-top" src="{item.image}" alt="Card cap">
            <div class="card-body">
            <h5 class="card-title">{item.name}</h5>
            <p class="card-text"><small class="text-muted">{item.category} - {item.kind}</small></p>
            </div>
        </div>
    </a>
    {/each}
</div>
