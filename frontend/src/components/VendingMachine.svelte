<script lang="ts">
	import axios from "axios";
	import Button from "./Button.svelte";

    export let items;

    let command = '';
    let buyTimeout: number;

    let boughtItem;

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

    const buyItem = async() => {
        const data = await axios.post(`http://localhost:3000/buy/${command}`).then((resp) => resp.data);

        if(data.success) {
            const item = items.find((i) => i.vending_id === Number(command));
            boughtItem = item;
            console.log(data.products)
            items = data.products;
            return
        }
        command = "ERROR";
    }

    const numpadGenerator = () => {
        let arr = [...Array(10).keys()]
        arr.splice(0, 1)
        arr.push("C", 0)
        return arr
    }

    const acceptItem = () => {
        boughtItem = undefined;
        command = "";
    }
</script>

<div class="h-full w-full relative overflow-hidden">
    <enhanced:img src='$lib/VendingMachine.svg?enhanced' alt="da vending machine" class="w-[1250px] absolute -top-[120px] left-1/2 transform -translate-x-1/2"/>
    <div class="absolute top-[80px] left-[420px] w-[800px] h-[310px] flex justify-between">
        {#each items as item}
            <div>
                <div class="h-[85%] w-[150px] flex justify-center items-end">
                    <img src={item.thumbnail} class="w-1/2 h-auto" alt="item"/>
                </div>
                <div class="h-[15%] w-[150px] flex justify-center items-center">
                    <div class="w-1/3 h-full bg-white flex items-center justify-center text-xl font-bold">
                        {item.vending_id}
                    </div>
                    <div class="w-1/3 h-full flex items-center justify-center text-md bg-neutral-600 text-white font-bold">
                        {item.price}$
                    </div> 
                </div>
            </div>
        {/each}

    </div>

    <!--NUMPAD-->
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
    <!--NUMPAD END-->

    {#if boughtItem && boughtItem !== null}
        <div class="absolute flex flex-col justify-center items-center gap-16 w-full h-full top-0 left-0 bg-neutral-800 bg-opacity-60 backdrop-blur-md">
            <div class="animate-scale">
                <img src={`${boughtItem.thumbnail}`} alt="boughtItem" class="w-[250px] h-auto animate-glow"/>
            </div>
            <button class="rounded-md bg-neutral-400 px-5 py-2 text-white" on:click={acceptItem}>Accept item</button>
        </div>
    {/if}
</div>

<style>
    @import url('https://fonts.cdnfonts.com/css/digital-numbers');

    .screen-font {
        font-family: 'Digital Numbers', sans-serif;                                       
    }
</style>