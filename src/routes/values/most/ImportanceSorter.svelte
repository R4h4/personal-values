<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import List from './List.svelte';
  import type { Value, Importance } from '../../../lib/types';
  import { valueStore } from '$lib/store.svelte';

  type Props = {
    // items?: Value[];
    hasUnsorted?: boolean;
  };
  let { hasUnsorted = $bindable(true) }: Props = $props();

  const { columns, updateImportance } = valueStore;

  function updateColumns({ items, importance }: { items: Value[]; importance: Importance }) {
    const currentColumnItems = columns()[importance];

    // Find items that left the column
    const itemLeft = currentColumnItems.find((item) => !items.includes(item));
    if (itemLeft) {
      // console.log(`Item ${itemLeft.id} left ${importance} column`);
      // Find which column the item entered
      const newImportance = (Object.keys(columns()) as Importance[]).find(
        (imp) => imp !== importance && columns()[imp].includes(itemLeft)
      );
      if (newImportance) {
        updateImportance(itemLeft.id, newImportance, true);
      } else {
        // console.error(`Couldn't determine new column for item ${itemLeft.id}`);
      }
      return;
    }

    // Find items that entered the column
    const itemEntered = items.find((item) => !currentColumnItems.includes(item));
    if (itemEntered) {
      // console.log(`Item ${itemEntered.id} entered ${importance} column`);
      updateImportance(itemEntered.id, importance, true);
      return;
    }

    // console.log(`No changes detected in ${importance} column`);
  }

  $effect(() => {
    hasUnsorted = columns()['Unsorted'].length > 0;
    console.log(columns());
  });
</script>

<div class="flex flex-col h-full w-full">
  <div class="flex-grow flex flex-col overflow-hidden">
    <div class="flex-grow flex flex-col p-4 overflow-auto">
      <div class="flex-grow flex gap-x-2 mb-4">
        {#each Object.entries(columns()) as [importanceString, values]}
          {@const importance = importanceString as Importance}
          {#if importance !== 'Unsorted'}
            <div class="flex-1 bg-white shadow-md p-2 px-auto pt-4 rounded-lg flex flex-col">
              <h2 class="text-md font-bold mb-2 h-14">{importance}</h2>
              <div class="flex-grow max-h-72 overflow-x-auto">
                <List
                  thisImportance={importance}
                  {updateColumns}
                  items={values}
                  className="flex flex-col justify-items-start items-center"
                />
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
    <div class={twMerge('bg-white p-4 border-t h-48', hasUnsorted ? '' : 'hidden')}>
      <h2 class="text-md font-bold mb-2">Unsorted</h2>
      <div class="h-32 overflow-auto">
        <List
          thisImportance="Unsorted"
          {updateColumns}
          items={columns()['Unsorted']}
          className="flex flex-wrap"
        />
      </div>
    </div>
  </div>
</div>
