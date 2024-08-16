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
      title="Select your Core Values" 
      subTitle="Finally, select your final 3-5 values. These are your core values." 
    />

    <div class="flex-1 overflow-hidden">
      <ImportanceSorter />
    </div>

    <div class={twMerge('w-full px-6 pb-6', valueStore.hasUnsortedValues ? 'hidden' : '')}>
      <Button 
        variant="default" 
        class='w-full text-white bg-primary' 
        href="/values/last"
      >
        Continue
      </Button>
    </div>
  </div>
</div>