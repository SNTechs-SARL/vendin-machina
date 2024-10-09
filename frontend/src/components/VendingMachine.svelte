<script>
	import Button from "./Button.svelte";
</script>
<div class="h-full w-full relative overflow-hidden">
    <enhanced:img src='$lib/VendingMachine.svg?enhanced' alt="da vending machine" class="w-[1250px] absolute -top-[120px] left-1/2 transform -translate-x-1/2"/>
    <div class="absolute w-[276px] h-[320px] top-[257px] left-[1267px] box-border p-4">
        <div class="h-full w-full grid grid-cols-3 gap-5">
            {#each [...Array(10).keys()].map(k => k == 9 ? 0 : k + 1) as value }
                <Button value={value}/>
            {/each}
        </div>

    </div>
</div>