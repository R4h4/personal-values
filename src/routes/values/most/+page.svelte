<script lang="ts">
  import ImportanceSorter from '../most/ImportanceSorter.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { twMerge } from 'tailwind-merge';
  import { valueStore } from '$lib/store.svelte';
  import HeaderSection from '$lib/components/HeaderSection.svelte';

  // let hasUnsorted = $state(true);
</script>

<div class="flex flex-col h-screen">
  <div id="Nav" class="flex w-full justify-between h-14 mt-2 mb-4 items-center" style="view-transition-name: nav;">
    <Button variant="link" href="/values" class="mr-4 h-14">Back</Button>
  </div>

  <div class="flex flex-col flex-1 overflow-hidden">
    <HeaderSection 
      title="Your Most Important Values" 
      subTitle="Narrow down your values by dragging them into the appropriate columns." 
    />

    <div class="flex-1 overflow-hidden">
      <ImportanceSorter />
    </div>

    {#if !valueStore.hasUnsortedValues}
      <div class='w-full px-6 pb-6'>
        <Button 
          variant="default" 
          class='w-full text-white bg-primary' 
          href="/values/last"
        >
          Continue
        </Button>
      </div>
    {/if}
  </div>
</div>