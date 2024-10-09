<script>
	import VendingMachine from "../components/VendingMachine.svelte";

    export let data;

    const items = data.items;
    
</script>
<div class="h-screen bg-cyan-200">
    <VendingMachine items={items}/>
</div>
<style>
    
</style>