<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";

    export let data;
</script>
<Nav user={data.user}/>
<div class="p-3">
    <slot />
</div>