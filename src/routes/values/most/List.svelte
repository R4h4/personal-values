<script lang="ts">
  import { dndzone, TRIGGERS, type DndEvent } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import type { Importance, Value } from '../../../lib/types';
  import { Badge } from '$lib/components/ui/badge';
  import { twMerge } from 'tailwind-merge';
  import type { ClassNameValue } from 'tailwind-merge';
  import { valueStore } from '$lib/store.svelte';
  import { send, receive } from '../transition';

  const flipDurationMs = 200;

  type Props = {
    items?: Value[];
    thisImportance: Importance | 'Unsorted';
    className?: ClassNameValue;
		badgeClass?: ClassNameValue;
		checkForUnsorted?: () => void;
  };

  let { 
		items = [], 
		thisImportance, 
		className, 
		badgeClass,
		checkForUnsorted
	}: Props = $props();
  let internalItems = $state(items);

  function handleSort(e: CustomEvent<DndEvent<Value>>) {
    internalItems = e.detail.items;
    if (e.detail.info.trigger === TRIGGERS.DROPPED_INTO_ZONE) {
      valueStore.updateImportance(parseInt(e.detail.info.id), thisImportance, true);
			if (checkForUnsorted) {
				checkForUnsorted();
			}
		}
  }
</script>

<section
  class={twMerge('h-full overflow-y-auto', className)}
  use:dndzone={{ items: internalItems, flipDurationMs }}
  onconsider={handleSort}
  onfinalize={handleSort}
>
  {#each internalItems as item (item.id)}
    <div 
      class="w-fit" 
      animate:flip={{ duration: flipDurationMs }}
      style={`view-transition-name: value_${item.id}; view-transition-group: value-card;`}
    >
      <Badge class={twMerge("p-0.5 px-2 m-1 bg-card", badgeClass)}>
        {item.name}
      </Badge>
    </div>
  {/each}
</section>
