<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import * as Card from '$lib/components/ui/card';

  export let id: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let className: string | undefined = undefined;
</script>

<Card.Root {id} class={twMerge('bg-pastel-yellow border-[#ECDCB0]', className)}>
  {#if title || description}
    {#if title}
      <Card.Header>
        <Card.Title tag="h2" class="text-2xl font-bold md:h-20 xl:h-auto">
          {title}
        </Card.Title>
      </Card.Header>
    {/if}

    {#if description}
      <Card.Content>
        <p>
          {description}
        </p>
      </Card.Content>
    {/if}
  {/if}
</Card.Root>

<!-- <div {id} class={twMerge("flex flex-col rounded-xl bg-pastel-yellow p-7 border border-[#ECDCB0]", className)}>
  {#if title || description}

    {#if title}
      <div class="mt-1 font-bold">{title}</div>
    {/if}

    {#if description}
      <div class="mt-2 text-muted-foreground">
        {description}
      </div>
    {/if}

  {/if}
</div> -->
