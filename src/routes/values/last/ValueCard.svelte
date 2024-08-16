<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '$lib/components/ui/card';
  import type { Value } from '$lib/types';

  type Props = {
    value: Value
    isSelected?: boolean;
    toggleSelection: (value: Value) => void;
  };
  let { value, isSelected = false, toggleSelection }: Props = $props();

  function handleClick() {
    toggleSelection(value)
  }
</script>

<Card 
  class={twMerge(
    'w-full max-w-md text-center relative overflow-hidden transition-all duration-200 ease-in-out',
    isSelected ? 'bg-accent/70 text-card-foreground scale-105 border-transparent' : 'bg-card text-card-foreground scale-100'
  )} 
  onclick={handleClick}
>
  <CardHeader class="p-2 pt-6 relative z-10">
    <CardTitle>{value.name}</CardTitle>
  </CardHeader>
  <CardContent class="px-2 relative z-10">
    <CardDescription 
      class={isSelected ? "text-card-foreground" : ""}
    >
      {value.description}
    </CardDescription>
  </CardContent>
</Card>