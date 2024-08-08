<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let id: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let subtitle: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let className: string | undefined = undefined;
  export let imgSrc: string | undefined = undefined;
  export let imgAlt: string = '';
  export let imgWidth: 'w-2/5' | 'w-1/5' = 'w-2/5';
  export let imgPosition: 'left' | 'right' | 'none' = 'none';

  $: hasImage = imgSrc !== undefined && imgSrc !== '' && imgPosition !== 'none';
</script>

<section
  {id}
  class={twMerge('flex flex-col md:flex-row max-w-screen-lg gap-y-5 gap-x-12 gap-8', className)}
>
  {#if hasImage && imgPosition === 'left'}
    <div class={`hidden md:block md:${imgWidth}`}>
      <div class="h-full flex">
        <img class="object-cover object-contain rounded-lg" src={imgSrc} alt={imgAlt} />
      </div>
    </div>
  {/if}

  <div class={twMerge('w-full')}>
    {#if title || subtitle || description}
      <div
        class={twMerge(
          'w-full flex-auto flex-col justify-start items-center inline-flex text-center mb-5',
          hasImage ? 'md:text-left md:items-start md:justify-start' : ''
        )}
      >
        {#if subtitle}
          <div class="text-primary pb-1 md:pb-2">
            {subtitle}
          </div>
        {/if}

        {#if title}
          <h2
            class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0 pb-3"
          >
            {title}
          </h2>
        {/if}

        {#if hasImage}
          <div class="h-full flex">
            <img
              class="md:hidden h-full object-cover object-contain rounded-lg"
              src={imgSrc}
              alt={imgAlt}
            />
          </div>
        {/if}

        {#if description}
          <p>
            <!-- class="leading-7 [&:not(:first-child)]:mt-6" -->
            {description}
          </p>
        {/if}
      </div>

      <slot></slot>
    {/if}
  </div>

  {#if hasImage && imgPosition === 'right'}
    <div class={`hidden md:block md:${imgWidth}`}>
      <img class="h-full object-cover object-contain rounded-lg" src={imgSrc} alt={imgAlt} />
    </div>
  {/if}
</section>
