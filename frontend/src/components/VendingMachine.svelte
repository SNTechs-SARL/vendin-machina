<style>
    @import url('https://fonts.cdnfonts.com/css/digital-numbers');

    .screen-font {
        font-family: 'Digital Numbers', sans-serif;                                       
    }
</style>

<script lang="ts">
	import Button from "./Button.svelte";

    let command = '';
    let buyTimeout: number;

    const handleCommand = (e) => {
        if (buyTimeout) clearTimeout(buyTimeout)
        
        if (e.detail.toString() === "C") {
            command = "";
            return;
        }

        if (command.length >= 3) return;
        command += e.detail.toString();

        buyTimeout = setTimeout(() => buyItem(), 1500);
    }

    const buyItem = () => {
        console.log("Buying", command)
    }

    const numpadGenerator = () => {
        let arr = [...Array(10).keys()]
        arr.splice(0, 1)
        arr.push("C", 0)
        return arr
    }
</script>

<div class="h-full w-full relative overflow-hidden">
    <enhanced:img src='$lib/VendingMachine.svg?enhanced' alt="da vending machine" class="w-[1250px] absolute -top-[120px] left-1/2 transform -translate-x-1/2"/>
    <div class="screen-font absolute w-[276px] h-[70px] bg-lime-200 top-[180px] left-[1267px] box-border p-6 text-4xl flex justify-end items-center border-2 border-neutral-500">
        {command}
    </div>
    <div class="absolute w-[276px] h-[320px] top-[257px] left-[1267px] box-border p-4 border-2 border-neutral-600">
        <div class="h-full w-full grid grid-cols-3 gap-5">
            {#each numpadGenerator() as value }
                <Button value={value} on:click={handleCommand}/>
            {/each}
        </div>
    </div>
</div>