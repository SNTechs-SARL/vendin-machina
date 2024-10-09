<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let value;

    let dispatch = createEventDispatcher();

    const handleClick = () => {
        dispatch("click", value);
    }
</script>

<button class={`bg-neutral-400 ${value === 0 ? 'col-start-2' : ''} flex justify-center items-center`} on:click={() => handleClick()}>
    {value}
</button>