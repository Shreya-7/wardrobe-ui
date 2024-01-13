<script>
    import ItemForm from "$lib/components/ItemForm.svelte";
    export let data;
    const items = data.items;
</script>

<div class="container">
    <button class="btn btn-primary mb-3" type="button" data-toggle="collapse" data-target="#createItemForm" aria-expanded="false" aria-controls="createItemForm">
        Create item
    </button>
    <div class="collapse mb-3" id="createItemForm">
        <ItemForm 
            action="?/create" 
            sizes={data.createFormDropdownValues.sizes}
            materials={data.createFormDropdownValues.materials}
            categories={data.createFormDropdownValues.categories}
            times={data.createFormDropdownValues.times}
            seasons={data.createFormDropdownValues.seasons}
            occasions={data.createFormDropdownValues.occasions}
            item=null
        />
    </div>
</div>

<div class="card-columns">
    {#each Object.entries(items) as [index, item]}
    <a href="/items/{item.item_id}">
        <div class="card">
            <img class="card-img-top" src="{item.image}" alt="Card cap">
            <div class="card-body">
            <h5 class="card-title">{item.name}</h5>
            <p class="card-text"><small class="text-muted">{item.category}</small></p>
            </div>
        </div>
    </a>
    {/each}
</div>
