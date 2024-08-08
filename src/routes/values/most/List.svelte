<script lang="ts">
  import { dndzone, TRIGGERS, type DndEvent } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import type { Importance, Value } from '../../../lib/types';
  import { Badge } from '$lib/components/ui/badge';
  import { twMerge } from 'tailwind-merge';
  import type { ClassNameValue } from 'tailwind-merge';
  import { valueStore } from '$lib/store.svelte';

  const flipDurationMs = 200;

  type Props = {
    items?: Value[];
    thisImportance: Importance | 'Unsorted';
    className?: ClassNameValue;
  };

  let { items = [], thisImportance, className }: Props = $props();
  let internalItems = $state(items);

  function handleSort(e: CustomEvent<DndEvent<Value>>) {
    internalItems = e.detail.items;
    if (e.detail.info.trigger === TRIGGERS.DROPPED_INTO_ZONE) {
      valueStore.updateImportance(parseInt(e.detail.info.id), thisImportance, true);
    }
  }
</script>

<section
  class={twMerge('h-full', className)}
  style="row-gap: -5px;"
  use:dndzone={{ items: internalItems, flipDurationMs }}
  onconsider={handleSort}
  onfinalize={handleSort}
>
  {#each internalItems as item (item.id)}
    <div class="w-fit h-fit" animate:flip={{ duration: flipDurationMs }}>
      <Badge class="p-0.5 px-2 m-1 bg-card">{item.name}</Badge>
    </div>
  {/each}
</section>
