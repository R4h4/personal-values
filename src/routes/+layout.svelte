<script>
  import '../app.css';
</script>

<div class="flex flex-col min-h-screen bg-background w-full">
  <!-- <Header /> -->

  <main class="flex flex-col w-full max-w-[1200px] mx-auto">
    <slot></slot>
  </main>

  <!-- <Footer /> -->
  <script
    defer
    src="https://umami.karsteneckhardt.com/script.js"
    data-website-id="65b90f91-837c-47e9-baa4-320b337cf841"
  ></script>
</div>
