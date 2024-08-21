<script lang="ts">
  import { twMerge, type ClassNameValue } from 'tailwind-merge';
  
  type Props = {
    title: string;
    subTitle: string;
    className?: ClassNameValue;
  };

  let { 
    title, subTitle, className 
  }: Props = $props();
</script>

<div 
  class={twMerge("h-24 ymd:h-36 mx-6 pb-4 text-center", className)} 
  style="view-transition-name: page-title;"
>
  <h1 class="text-2xl ymd:text-3xl font-bold mb-2 ymd:mb-4">
    {title}
  </h1>
  <p class="text-md ymd:text-lg text-gray-600 mb-4">
    {subTitle}
  </p>
</div>