<script lang="ts">
  import { valueStore } from '$lib/store.svelte';
  import type { Value } from '$lib/types';

  const { columns } = valueStore;

  let selectedValueIds: number[] = $state([]);
  let veryImportantValues = $derived(columns['Very Important']);

  $effect(() => {
      if (selectedValueIds.length > 5) {
          selectedValueIds = selectedValueIds.slice(1);
      }
  });

  function toggleSelection(id: number) {
    const index = selectedValueIds.indexOf(id);
    if (index > -1) {
        selectedValueIds = [...selectedValueIds.slice(0, index), ...selectedValueIds.slice(index + 1)];
    } else if (selectedValueIds.length < 5) {
        selectedValueIds = [...selectedValueIds, id];
    }
  }

  $effect(() => {
      console.log('Selected values:', selectedValueIds);
  });

function isSelected(id: number): boolean {
    return selectedValueIds.includes(id);
}
</script>

<div class="h-full">
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each veryImportantValues as value (value.id)}
          <button
              class="relative p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              class:bg-white={!isSelected(value.id)}
              class:bg-accent={isSelected(value.id)}
              class:text-accent-foreground={isSelected(value.id)}
              class:translate-y-0={!isSelected(value.id)}
              class:-translate-y-2={isSelected(value.id)}
              on:click={() => toggleSelection(value.id)}
          >
              <h3 class="text-lg font-semibold mb-2">{value.name}</h3>
              <p class="text-sm">{value.description}</p>
          </button>
      {/each}
  </div>
  <p class="mt-4 text-sm text-gray-600">
      Selected: {selectedValueIds.length} / 5
  </p>
</div>
