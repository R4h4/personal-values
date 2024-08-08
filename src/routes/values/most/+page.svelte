<script lang="ts">
  import ImportanceSorter from '../most/ImportanceSorter.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { twMerge } from 'tailwind-merge';

  let hasUnsorted = $state(true);
</script>

<div class="flex flex-col text-center h-screen">
  <div
    id="Nav"
    class="grow flex w-full justify-between h-14 mt-2 mb-4 items-center"
    style="view-transition-name: nav;"
  >
    <Button variant="link" href="/values" class="mr-4 h-14">Back</Button>
  </div>

  <div class="h-full flex flex-col">
    <div class="h-36 mx-6 pb-4" style="view-transition-name: page-title;">
      <h1 class="text-3xl font-bold mb-4">Your most important Values</h1>

      <p class="text-lg text-gray-600 mb-4">
        Now categorize your most important values again in the same categories.
      </p>
    </div>

    <ImportanceSorter bind:hasUnsorted />

    <Button
      variant="default"
      class={twMerge('w-full text-white mb-6', hasUnsorted ? 'hidden' : 'bg-primary')}
      href="/values/last"
    >
      Continue
    </Button>
  </div>
</div>
