<script>
    export let data;
</script>

<div class="card-columns">
    {#each Object.entries(data.items) as [index, item]}
    <a href="/items/{item.item_id}">
        <div class="card">
            <img class="card-img-top" src="https://swaag.in/wp-content/uploads/2020/08/5f42972117d5a.jpg" alt="Card cap">
            <div class="card-body">
            <h5 class="card-title">{item.name}</h5>
            <p class="card-text"><small class="text-muted">{item.category}</small></p>
            </div>
        </div>
    </a>
    {/each}
</div>
