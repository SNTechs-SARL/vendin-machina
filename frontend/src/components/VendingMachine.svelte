<script>
	import Button from "./Button.svelte";

</script>
<div class="h-full w-full relative overflow-hidden">
    <enhanced:img src='$lib/VendingMachine.svg?enhanced' alt="da vending machine" class="w-[1250px] absolute -top-[120px] left-1/2 transform -translate-x-1/2"/>
    <div class="absolute w-[276px] h-[320p] top-[257px] left-[1267px] box-border p-4">
        <div class="h-full">

        </div>
        <Button/>
    </div>
</div>