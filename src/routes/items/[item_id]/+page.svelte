<script>
    import ItemForm from "$lib/components/ItemForm.svelte";

    export let data;
    let item = data.item;
    $: editMode = false;

    function turnOnEditMode() {
        editMode = true;
    }

</script>

{#if !editMode }
<div class="container">
    <div class="row">
        <div class="col-md-6 col-xs-12" id="item-image">
            <img class="img-fluid" src="{item.image}" alt="Card cap">
        </div>
        <div class="col-md-6 col-xs-12" id="item-details">
          <h5>{item.name}</h5>
          <p><small class="text-muted">{item.category}</small></p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Size: </b>{item.size}</li>
            <li class="list-group-item"><b>Time: </b>{item.time}</li>
            <li class="list-group-item"><b>Season: </b>{item.season}</li>
            <li class="list-group-item"><b>Material: </b>{item.material}</li>
            <li class="list-group-item"><b>Occasion: </b>{item.occasion}</li>
            <li class="list-group-item"><b>Tags: </b>{item.tags}</li>
            <li class="list-group-item"><b>Colors: </b>{item.colors}</li>
          </ul>
          <button 
            class="btn btn-primary m-4"
            on:click={turnOnEditMode}
          >
            Edit
          </button>
        </div>
        
    </div>
</div>
{:else}
<ItemForm 
    action="?/update" 
    sizes={data.createFormDropdownValues.sizes}
    materials={data.createFormDropdownValues.materials}
    categories={data.createFormDropdownValues.categories}
    times={data.createFormDropdownValues.times}
    seasons={data.createFormDropdownValues.seasons}
    occasions={data.createFormDropdownValues.occasions}
    item={item}
/>
{/if}
