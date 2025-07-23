<script lang="ts">
    import { Label } from "$lib/components/ui/label";

    export let name: string;
    export let label: string;
    export let options: string[];
    export let selectedValue: string = "";
    export let required: boolean = false;
    export let placeholder: string = "";

    $: placeholderText = placeholder || `Select ${label.toLowerCase()}`;
</script>

<div class="space-y-2">
    <Label for={name}>
        {label}
        {#if required}<span class="text-destructive">*</span>{/if}
    </Label>
    <select 
        {name} 
        {required}
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
        <option value="">{placeholderText}</option>
        {#each options as option}
            <option value={option} selected={selectedValue.toLowerCase() === option.toLowerCase()}>
                {option}
            </option>
        {/each}
    </select>
</div> 