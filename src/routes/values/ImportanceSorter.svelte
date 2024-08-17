<script lang="ts">
  import { tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import ValueCard from './ValueCard.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardHeader, CardTitle } from '$lib/components/ui/card';
  import type { Value, Importance } from '../../lib/types';
  import { valueStore } from '$lib/store.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import { Badge } from '$lib/components/ui/badge';

  type Props = {
    items?: Value[];
    allValuesVoted?: boolean;
  };
  let { items = [], allValuesVoted = $bindable(false) }: Props = $props();

  let totalItems: number = $state(items.length);
  let transitioning = $state(false);

  let currentItem = $derived(valueStore.values[valueStore.currentIndex] || null);
  let hasMoreItems = $derived(valueStore.currentIndex < valueStore.values.length);
  let sortedItems = $derived(valueStore.values.filter((item: Value) => item.importance !== null));

  $effect(() => {
    allValuesVoted = !hasMoreItems;
  });

  type ImportanceOption = {
    label: Importance;
    class: string;
  };

  const importanceOptions: ImportanceOption[] = [
    { label: 'Very Important', class: 'bg-accent/90 hover:bg-accent border-transparent' },
    { label: 'Important', class: 'bg-accent/75 hover:bg-accent border-transparent' },
    { label: 'Not Important', class: 'bg-accent/50 hover:bg-accent border-transparent' }
  ];

  async function handleImportance(importance: Importance): Promise<void> {
    if (currentItem && !transitioning) {
      transitioning = true;

      valueStore.updateImportance(currentItem.id, importance);

      await tick();
      await tick();

      transitioning = false;
    }
  }

  function clearVotes(): void {
    valueStore.clearItems();
    console.log(valueStore.values);
    valueStore.setInitialValues(items);
    console.log(valueStore.values);
  }
</script>

<div class="flex mx-4 h-full justify-center">
  <Card class="bg-white shadow-md w-full max-w-md mb-4 border-none mb-auto">
    <CardHeader>
      <div class="flex justify-between items-center mb-8">
        <p class="text-sm text-gray-600">
          {Math.min(valueStore.currentIndex + 1, totalItems)}/{totalItems}
        </p>

        <Button variant="secondary" on:click={clearVotes}>Clear Votes</Button>
      </div>
    </CardHeader>
    <CardContent>
      {#if hasMoreItems}
      <div class="relative h-52 overflow-hidden">
        <!-- {#if hasMoreItems} -->
          {#key valueStore.currentIndex}
            <div
              in:fly={{ x: 300, duration: 300, easing: cubicOut }}
              out:fly={{ x: -300, duration: 300, easing: cubicOut }}
              class="absolute inset-0"
            >
              <ValueCard
                name={currentItem?.name ?? ''}
                description={currentItem?.description ?? ''}
              />
            </div>
          {/key}
        <!-- {:else}
          <div transition:fade={{ duration: 200 }}>
            <Card class="w-full max-w-md">
              <CardHeader>
                <CardTitle>All items sorted!</CardTitle>
              </CardHeader>
            </Card>
          </div>
        {/if} -->
      </div>
      <!-- {#if hasMoreItems} -->
        <div class="flex flex-col space-y-4 mt-4" transition:fade={{ duration: 200 }}>
          {#each importanceOptions as { label, class: className }}
            <Button
              on:click={() => handleImportance(label)}
              class={className}
              variant="outline"
              disabled={transitioning}
            >
              {label}
            </Button>
          {/each}
        </div>
      {:else}
        <h2>
          You made it through the first step! Here are your most important values:
        </h2>
        <div class="flex flex-wrap overflow-y-auto">
          {#each valueStore.veryImportantValues as item (item.id)}
          <div 
            class="w-fit" 
            style={`view-transition-name: value_${item.id}; view-transition-group: value-card;`}
          >
            <Badge class="p-0.5 px-2 m-1 bg-card bg-accent/90 hover:bg-accent">
              {item.name}
            </Badge>
          </div>
          {/each}
        </div>
        <!-- {:else}
        <ul class="list-disc pl-5 mt-4">
          {#each sortedItems as item}
            <li class="mb-2">
              <span class="font-semibold">{item.name}:</span> {item.importance}
              <p class="text-sm text-gray-600">{item.description}</p>
            </li>
          {/each}
        </ul> -->
        
      {/if}
    </CardContent>
  </Card>
</div>