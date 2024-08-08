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

  type Props = {
    items?: Value[];
    allValuesVoted?: boolean;
  };
  let { items = [], allValuesVoted = $bindable(false) }: Props = $props();

  // const { values, currentIndex, clearItems, setInitialValues } = valueStore;
  // let values: Value[] = $state(items);
  // let currentIndex: number = $state(0);
  // let voteCount: number = $state(0);
  let totalItems: number = $state(items.length);
  let transitioning = $state(false);

  let currentItem = $derived(valueStore.values[valueStore.currentIndex] || null);
  let hasMoreItems = $derived(valueStore.currentIndex < valueStore.values.length);
  let sortedItems = $derived(valueStore.values.filter((item) => item.importance !== null));
  $inspect(sortedItems);

  $effect(() => {
    allValuesVoted = !hasMoreItems;
  });
  // $inspect(values);

  type ImportanceOption = {
    label: Importance;
    class: string;
  };

  const importanceOptions: ImportanceOption[] = [
    { label: 'Very Important', class: 'bg-accent/90 hover:bg-accent' },
    { label: 'Important', class: 'bg-accent/75 hover:bg-accent' },
    { label: 'Not Important', class: 'bg-accent/50 hover:bg-accent' }
  ];

  async function handleImportance(importance: Importance): Promise<void> {
    if (currentItem && !transitioning) {
      transitioning = true;

      valueStore.updateImportance(currentItem.id, importance);

      await tick();
      await tick();

      transitioning = false;
      // updateVoteCount();
    }
  }

  function clearVotes(): void {
    valueStore.clearItems();
    console.log(valueStore.values);
    valueStore.setInitialValues(items);
    console.log(valueStore.values);
    // updateVoteCount();
  }

  // function updateVoteCount(): void {
  //   voteCount = sortedItems.length;
  // }

  // onMount(() => {

  //   const unsubscribe = valueStore.subscribe(state => {
  //     // stateValues = state.values;
  //     values = [
  //       ...state.values,
  //       ...values.filter((item) => !state.values.map((item) => item.id).includes(item.id))
  //     ];

  //     currentIndex = state.currentIndex;
  //     updateVoteCount();
  //   });

  //   if (values.length === 0) {
  //     valueStore.setInitialValues(items);
  //   }

  //   return unsubscribe;
  // });
</script>

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
    <div class="relative h-52 overflow-hidden">
      {#if hasMoreItems}
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
      {:else}
        <div transition:fade={{ duration: 200 }}>
          <Card class="w-full max-w-md">
            <CardHeader>
              <CardTitle>All items sorted!</CardTitle>
            </CardHeader>
          </Card>
        </div>
      {/if}
    </div>
    {#if hasMoreItems}
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
