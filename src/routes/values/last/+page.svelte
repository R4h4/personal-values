<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { twMerge } from 'tailwind-merge';
  // import { Sparkles } from 'lucide-svelte'
  import ValueSelector from './ValueSelector.svelte';
</script>

<div class="flex flex-col text-center h-screen">
  <div
    id="Nav"
    class="grow flex w-full justify-between h-14 mt-2 mb-4 items-center"
    style="view-transition-name: nav;"
  >
    <Button variant="link" href="/values/most" class="mr-4 h-14">Back</Button>
  </div>

  <div class="h-full flex flex-col mx-6">
    <div class="h-36 mx-6 pb-4" style="view-transition-name: page-title;">
      <h1 class="text-3xl font-bold mb-4">Select your Core Values</h1>

      <p class="text-lg text-gray-600 mb-4">
        Finally, select your final 3-5 values. These are your core values.
      </p>
    </div>

    <ValueSelector />

    <Button variant="default" class={twMerge('w-full text-white mb-6', '')} href="/values/last">
      <!-- <Sparkles size={36} />  -->
      Generate
    </Button>
  </div>
</div>
