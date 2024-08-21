<script lang="ts">
  import { tick } from 'svelte';
  import { fade, fly, slide, crossfade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import ValueCard from './ValueCard.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardHeader, CardTitle } from '$lib/components/ui/card';
  import type { Value, Importance } from '../../lib/types';
  import { valueStore } from '$lib/store.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import { Badge } from '$lib/components/ui/badge';
  import { twMerge } from 'tailwind-merge';
  import { Undo2 } from 'lucide-svelte';

  type Props = {
    items?: Value[];
    allValuesVoted?: boolean;
  };
  let { items = [], allValuesVoted = $bindable(false) }: Props = $props();

  let totalItems: number = $state(items.length);
  let transitioning = $state(false);

  let currentItem = $derived(valueStore.values[valueStore.currentIndex] || null);
  let hasMoreItems = $derived(valueStore.currentIndex < valueStore.values.length);

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

  function moveOneBack(): void {
    valueStore.moveIndexBackByOne();
  }

  let contentVisible = $state(true);

  async function transitionContent() {
    contentVisible = false;
    await tick();
    contentVisible = true;
  }

  $effect(() => {
    if (hasMoreItems !== undefined) {
      transitionContent();
    }
  });

  
</script>

<div class="flex mx-4 h-full justify-center">
  <Card class="bg-white shadow-md w-full max-w-md mb-4 border-none mb-auto">
    <CardHeader>
      <div class="flex justify-between items-center">
        <p class="text-sm text-gray-600">
          {Math.min(valueStore.currentIndex + 1, totalItems)}/{totalItems}
        </p>
        <button 
          class="md:hover:border-accent border border-transparent bg-none p-2 rounded-lg"
          onclick={moveOneBack}
        >
          <Undo2 class="w-6 h-6" />
      </button>
      </div>
    </CardHeader>
    <CardContent>
      {#key hasMoreItems}
        <div transition:slide={{ duration: 300, easing: cubicOut }}>
          {#if contentVisible}
            <div transition:fade={{ duration: 100 }}>
              {#if hasMoreItems}
                <div class="relative h-44 ymd:h-52 overflow-hidden">
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
                </div>
                <div class="flex space-x-2 justify-center ymd:space-x-0 ymd:flex-col ymd:space-y-4 mt-4" transition:fade={{ duration: 200 }}>
                  {#each importanceOptions as { label, class: className }}
                    <Button
                      on:click={() => handleImportance(label)}
                      class={twMerge(className, 'w-full h-14 w-24 text-wrap ymd:w-full ymd:h-10')}
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
                    style={`view-transition-name: value_${item.id};`}
                  >
                    <Badge class="p-0.5 px-2 m-1 bg-card bg-accent/90 hover:bg-accent">
                      {item.name}
                    </Badge>
                  </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/key}
    </CardContent>
  </Card>
</div>