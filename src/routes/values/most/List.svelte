<script lang="ts">
  import { dndzone, type DndEvent } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import type { Importance, Value } from '../../../lib/types';
  import { Badge } from '$lib/components/ui/badge';
  import { twMerge } from 'tailwind-merge';
  import type { ClassNameValue } from 'tailwind-merge';

  const flipDurationMs = 200;

  type Props = {
    items?: Value[];
    thisImportance: Importance | 'Unsorted';
    updateColumns: (args: { items: Value[]; importance: Importance | 'Unsorted' }) => void;
    className?: ClassNameValue;
  };

  let { items = [], thisImportance, updateColumns, className }: Props = $props();
  let internalItems = $state(items);

  function handleSort(e: CustomEvent<DndEvent<Value>>) {
    internalItems = e.detail.items;
    updateColumns({ items: internalItems, importance: thisImportance });
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
