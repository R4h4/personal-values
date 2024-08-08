<script>
  import '../app.css';
</script>

<div class="flex flex-col min-h-screen bg-background">
  <!-- <Header /> -->

  <main class="flex flex-col w-full max-w-[1200px]">
    <slot></slot>
  </main>

  <!-- <Footer /> -->
  <script
    defer
    src="https://umami.karsteneckhardt.com/script.js"
    data-website-id="f890ed42-9ed1-4a12-bb23-82dfcee4cc20"
  ></script>
</div>
