<script>
    import logo from '$lib/assets/breathe-logo-transparent.png';
    import * as Drawer from '$lib/components/ui/drawer';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    import { isMobile } from '$lib/stores/screen';

    export let open = false;
    export let results = [];
</script>




{#if $isMobile}
  <Drawer.Root bind:open={open}>
    <Drawer.Trigger asChild let:builder>
      <Button class="pr-0" variant="default" builders={[builder]}>
        <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </Button>
    </Drawer.Trigger>

    <Drawer.Content class="bg-slate-800">

      <Drawer.Header class="text-left">
        <Drawer.Title>View Stats</Drawer.Title>
        <Drawer.Description>
          View stats about your activity
        </Drawer.Description>
      </Drawer.Header>

      {#if results.length > 0}
        <div class="my-8 w-full max-w-md px-4 ">
            <h2 class="text-xl font-bold mb-2">Results</h2>
            <table class="w-full border-collapse border border-gray-700">
                <thead>
                    <tr class="bg-gray-800">
                        <th class="border border-gray-700 px-2 py-1">Round</th>
                        <th class="border border-gray-700 px-2 py-1">Deep Breathing</th>
                        <th class="border border-gray-700 px-2 py-1">Exhale Hold</th>
                        <th class="border border-gray-700 px-2 py-1">Inhale Hold</th>
                    </tr>
                </thead>
                <tbody>
                    {#each results as result}
                        <tr class="text-center">
                            <td class="border border-gray-700 px-2 py-1">{result.round}</td>
                            <td class="border border-gray-700 px-2 py-1">{result.breathCount} breaths</td>
                            <td class="border border-gray-700 px-2 py-1">{result.exhaleHold}s</td>
                            <td class="border border-gray-700 px-2 py-1">{15 - Number(result.inhaleHold)}s</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
      {/if}






      <Drawer.Footer class="pt-2">
        <Drawer.Close asChild let:builder>
          <Button variant="outline" builders={[builder]}>Cancel</Button>
        </Drawer.Close>
      </Drawer.Footer>

    </Drawer.Content>
  </Drawer.Root>

{:else}

  <Dialog.Root bind:open>
    <Dialog.Trigger asChild let:builder>
      <Button class="pr-0" variant="default" builders={[builder]}>
        <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
      </Button>
    </Dialog.Trigger>

    <Dialog.Content class="sm:max-w-[425px] bg-slate-800">

      <Drawer.Header class="text-left">
        <Drawer.Title>View Stats</Drawer.Title>
        <Drawer.Description>
          View stats about your activity
        </Drawer.Description>
      </Drawer.Header>

      {#if results.length > 0}
        <div class="my-8 w-full max-w-md px-4 ">
            <h2 class="text-xl font-bold mb-2">Results</h2>
            <table class="w-full border-collapse border border-gray-700">
                <thead>
                    <tr class="bg-gray-800">
                        <th class="border border-gray-700 px-2 py-1">Round</th>
                        <th class="border border-gray-700 px-2 py-1">Deep Breathing</th>
                        <th class="border border-gray-700 px-2 py-1">Exhale Hold</th>
                        <th class="border border-gray-700 px-2 py-1">Inhale Hold</th>
                    </tr>
                </thead>
                <tbody>
                    {#each results as result}
                        <tr class="text-center">
                            <td class="border border-gray-700 px-2 py-1">{result.round}</td>
                            <td class="border border-gray-700 px-2 py-1">{result.breathCount} breaths</td>
                            <td class="border border-gray-700 px-2 py-1">{result.exhaleHold}s</td>
                            <td class="border border-gray-700 px-2 py-1">{15 - Number(result.inhaleHold)}s</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
      {/if}



    </Dialog.Content>
  </Dialog.Root>
{/if}


