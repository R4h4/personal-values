<script lang="ts">
  import { valueStore } from '$lib/store.svelte';
  import type { Value } from '$lib/types';
  import ValueCard from './ValueCard.svelte';

  let veryImportantValues = $derived(valueStore.columns['Very Important']);

  $effect(() => {
      if (valueStore.coreValues.length > 5) {
        // Update first element to not be selected
        valueStore.updateCoreValues(valueStore.coreValues[0].id);
      }
  });

  function toggleSelection(value: Value) {
    console.log('Toggling selection for value:', value);
    if (valueStore.coreValues.length < 5 || valueStore.coreValues.map((value) => value.id).includes(value.id)) {
      valueStore.updateCoreValues(value.id);
    }
  }
</script>

<div class="flex flex-col h-full relative">
  <!-- Fading overlay at the top -->
  <div class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10"></div>

  <!-- Main content area -->
  <div class="flex-1 overflow-y-auto pt-4">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-16">
      {#each veryImportantValues as value (value.id)}
        <ValueCard
          value={value}
          isSelected={valueStore.coreValues.map((value) => value.id).includes(value.id)}
          {toggleSelection}
        />
      {/each}
    </div>
  </div>

  <!-- Fading overlay at the bottom -->
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10"></div>

  <!-- Pill counter overlay -->
  <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
    <div class="bg-black bg-opacity-50 text-white px-4 py-1 rounded-full text-sm">
      Selected: {valueStore.coreValues.length} / 5
    </div>
  </div>
</div>