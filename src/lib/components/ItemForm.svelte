<script>
// @ts-nocheck
	import { enhance } from '$app/forms';
    export let action;
    export let sizes, materials, categories, times, seasons, occasions, kinds;
    export let item;

    function getValue(property) {
        let value = "";
        if (item[property]) {
            value = item[property];
        }
        return value;
    }
    function isPresentOnItem(property, value) {
        return item[property]?.toString().toLowerCase() === value.toString().toLowerCase();
    }
</script>

<form method="POST" action="{action}" use:enhance>
    <div class="form-row">
        <div class="form-group col-md-4">
            <label for="name">Name of the item</label>
            <input type="text" class="form-control" id="name" name="name" value="{getValue('name')}" required>
        </div>
        <div class="form-group col-md-4">
            <label for="image">Image URL</label>
            <input type="text" class="form-control" id="image" name="image" value="{getValue('image')}">
        </div>
        <div class="form-group col-md-2">
            <label for="size">Size</label>
            <select class="form-control" id="size" name="size">
                {#each sizes as size}
                <option value="{size}" selected="{isPresentOnItem('size', size)}">{size}</option>
                {/each}
            </select>
        </div>
        <div class="form-group col-md-2">
            <label for="size">Material</label>
            <select class="form-control" id="material" name="material">
                {#each materials as material}
                <option value="{material}" selected="{isPresentOnItem('material', material)}">{material}</option>
                {/each}
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-3">
            <label for="category">Category</label>
            <select class="form-control" id="category" name="category" required>
                {#each categories as category}
                <option value="{category}" selected="{isPresentOnItem('category', category)}">{category}</option>
                {/each}
            </select>
        </div>
        
        <div class="form-group col-md-3">
            <label for="size">Time</label>
            <select class="form-control" id="time" name="time">
                {#each times as time}
                <option value="{time}" selected="{isPresentOnItem('time', time)}">{time}</option>
                {/each}
            </select>
        </div>
        <div class="form-group col-md-3">
            <label for="size">Season</label>
            <select class="form-control" id="season" name="season">
                {#each seasons as season}
                <option value="{season}" selected="{isPresentOnItem('season', season)}">{season}</option>
                {/each}
            </select>
        </div>
        <div class="form-group col-md-3">
            <label for="size">Occasion</label>
            <select class="form-control" id="occasion" name="occasion">
                {#each occasions as occasion}
                <option value="{occasion}" selected="{isPresentOnItem('occasion', occasion)}">{occasion}</option>
                {/each}
            </select>
        </div>
        <div class="form-group col-md-3">
            <label for="size">Kind</label>
            <select class="form-control" id="kind" name="kind">
                {#each kinds as kind}
                <option value="{kind}" selected="{isPresentOnItem('kind', kind)}">{kind}</option>
                {/each}
            </select>
        </div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>