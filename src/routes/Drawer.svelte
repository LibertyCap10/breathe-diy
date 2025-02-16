<script>
    import logo from '$lib/assets/breathe-logo-transparent.png';
    import * as Drawer from '$lib/components/ui/drawer';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    import { isMobile } from '$lib/stores/screen';

    export let open = false;
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
        <Drawer.Title>View Profile</Drawer.Title>
        <Drawer.Description>
          View stats about your activity here
        </Drawer.Description>
      </Drawer.Header>

      <!-- <form class="grid items-start gap-4 px-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input type="email" id="email" value="shadcn@example.com" />
        </div>
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input id="username" value="@shadcn" />
        </div>
        <Button type="submit">Save changes</Button>
      </form> -->

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
        <Drawer.Title>View Profile</Drawer.Title>
        <Drawer.Description>
          View stats about your activity here
        </Drawer.Description>
      </Drawer.Header>

      <!-- <form class="grid items-start gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input type="email" id="email" value="shadcn@example.com" />
        </div>
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input id="username" value="@shadcn" />
        </div>
        <Button type="submit">Save changes</Button>
      </form> -->

    </Dialog.Content>
  </Dialog.Root>
{/if}


<!-- {#if $isDesktop}
  <Dialog.Root bind:open>
    <Dialog.Trigger asChild let:builder>
      <Button variant="outline" builders={[builder]}>Edit Profile</Button>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
      </Dialog.Header>
      <form class="grid items-start gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input type="email" id="email" value="shadcn@example.com" />
        </div>
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input id="username" value="@shadcn" />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </Dialog.Content>
  </Dialog.Root>
{:else} -->
  <!-- <Drawer.Root bind:open={open}>
    <Drawer.Trigger asChild let:builder>
      <Button class="" variant="default" builders={[builder]}>
        <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </Button>
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Header class="text-left">
        <Drawer.Title>Edit profile</Drawer.Title>
        <Drawer.Description>
          Make changes to your profile here. Click save when you're done.
        </Drawer.Description>
      </Drawer.Header>
      <form class="grid items-start gap-4 px-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input type="email" id="email" value="shadcn@example.com" />
        </div>
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input id="username" value="@shadcn" />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
      <Drawer.Footer class="pt-2">
        <Drawer.Close asChild let:builder>
          <Button variant="outline" builders={[builder]}>Cancel</Button>
        </Drawer.Close>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root> -->
<!-- {/if} -->