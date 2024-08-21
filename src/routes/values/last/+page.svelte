<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { twMerge } from 'tailwind-merge';
  // import { Sparkles } from 'lucide-svelte'
  import ValueSelector from './ValueSelector.svelte';
  import HeaderSection from '$lib/components/HeaderSection.svelte';
  import { valueStore } from '$lib/store.svelte';

  let nValuesSelected = $derived(valueStore.coreValues.length);
  let canContinue = $derived((nValuesSelected >= 3) && (nValuesSelected <= 5));
</script>

<div class="flex flex-col h-dvh">
  <div id="Nav" class="flex w-full justify-between h-8 ymd:h-12 mt-4 mb-2 items-center" style="view-transition-name: nav;">
    <Button variant="link" href="/values/most" class="mr-4 h-14">Back</Button>
  </div>

  <div class="flex flex-col flex-1 overflow-hidden">
    <HeaderSection
      title="Select your Core Values"
      subTitle="Finally, select your final 3-5 values. These are your core values."
    />

    <div class="flex-1 overflow-hidden">
      <ValueSelector />
    </div>

    <div class='w-full p-6 pt-2'>
      <Button
        variant="default"
        class={twMerge(
          'w-full text-white',
          canContinue ? 'bg-primary' : 'bg-primary/30 pointer-events-none'
        )}
        href="/values/most"
      >
        <!-- <Sparkles size={36} /> -->
        Finish
      </Button>
    </div>
  </div>
</div>
