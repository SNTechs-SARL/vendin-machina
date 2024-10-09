<script lang="ts">
    export let value;
</script>

<button class={`bg-neutral-400 ${value === 0 ? 'col-start-2' : ''} flex justify-center items-center`}>
    {value}
</button>