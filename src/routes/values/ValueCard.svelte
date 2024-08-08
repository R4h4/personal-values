<script lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '$lib/components/ui/card';

  export let name: string;
  export let description: string;
</script>

<Card class="w-full max-w-md">
  <CardHeader>
    <CardTitle>{name}</CardTitle>
  </CardHeader>
  <CardContent>
    <CardDescription>{description}</CardDescription>
  </CardContent>
</Card>
