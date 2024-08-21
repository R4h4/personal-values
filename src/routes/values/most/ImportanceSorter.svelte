<script lang="ts">
  import List from './List.svelte';
  import type { Importance } from '../../../lib/types';
  import { valueStore } from '$lib/store.svelte';
  import { twMerge } from 'tailwind-merge';

  const headerName = {
    'Very Important': 'More Important',
    Important: 'Important',
    'Not Important': 'Less Important'
  };
  const badgeClasses = {
    'Very Important': 'bg-accent/90 hover:bg-accent',
    Important: 'bg-accent/60 hover:bg-accent',
    'Not Important': 'bg-accent/30 hover:bg-accent'
  };
</script>

<div class="flex flex-col h-full justify-center">
  <div class="flex-1 overflow-hidden">
    <div class="flex h-full gap-x-2 pb-4 m-4">
      {#each Object.entries(valueStore.columns) as [importanceString, values]}
        {@const importance = importanceString as Importance}
        {#if importance !== 'Unsorted'}
          <div class="flex-1 flex flex-col bg-white shadow-md p-2 px-auto pt-4 mb-4 rounded-lg text-center">
            <h2 class="text-md font-bold mb-2">
              {headerName[importance]}
            </h2>
            <div class="flex-1 overflow-hidden">
              <List
                thisImportance={importance}
                items={values}
                className="h-full overflow-y-auto flex flex-col items-center"
                badgeClass={badgeClasses[importance]}
              />
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
  <!-- {#if valueStore.hasUnsortedValues} -->
    <div class={twMerge('bg-white p-4 border-t', valueStore.hasUnsortedValues ? '' : 'hidden')}>
    <!-- <div class='bg-white p-4 border-t'> -->
      <h2 class="text-md font-bold mb-2">Unsorted</h2>
      <div class="h-24 ymd:h-32 overflow-auto">
        <List 
          thisImportance="Unsorted" 
          items={valueStore.columns['Unsorted']} 
          className="flex flex-wrap" 
        />
      </div>
    </div>
  <!-- {/if} -->
</div>
