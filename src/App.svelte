<script>
  import { onMount } from "svelte";
  import {
    darkMode,
    showConfig,
    isConnected,
    activeTab,
  } from "./stores/keyboardStore.js";

  import Header from "./components/layout/Header.svelte";
  import Keyboard from "./components/keyboard/Keyboard.svelte";
  import BottomBar from "./components/layout/BottomBar.svelte";
  import Landing from "./components/Landing.svelte";

  import KeyBindingsPanel from "./components/panels/KeyBindingsPanel.svelte";
  import ProfilesPanel from "./components/panels/ProfilesPanel.svelte";
  import LightingPanel from "./components/panels/LightingPanel.svelte";
  import OptionsPanel from "./components/panels/OptionsPanel.svelte";

  onMount(() => {
    if ($darkMode) {
      document.body.classList.add("dark-mode");
    }
  });

  $: if ($darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
</script>

<main class:dark-mode={$darkMode}>
  {#if !$showConfig}
    <Landing />
  {:else}
    <Header />

    <div class="keyboard-container" class:menu-open={$activeTab !== null}>
      <Keyboard />
    </div>

    <!-- Main interface with integrated menu -->
    <div class="main-interface">
      <BottomBar />

      <!-- Integrated menu panels -->
      {#if $activeTab}
        <div class="menu-panel" class:active={$activeTab !== null}>
          {#if $activeTab === "keybindings"}
            <KeyBindingsPanel />
          {:else if $activeTab === "profiles"}
            <ProfilesPanel />
          {:else if $activeTab === "lighting"}
            <LightingPanel />
          {:else if $activeTab === "options"}
            <OptionsPanel />
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
    background-color: #ded8cb;
    color: #141414;
    overflow-x: hidden;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  :global(body.dark-mode) {
    background-color: #141414;
    color: #ded8cb;
  }

  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .dark-mode {
    background-color: #141414;
    color: #ded8cb;
  }

  .keyboard-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    flex: 1;
    transition: transform 0.3s ease;
    margin-bottom: 200px; /* Space for the menu panel */
  }

  .keyboard-container.menu-open {
    transform: translateY(-100px); /* Move keyboard up when menu is open */
  }

  /* Main interface with integrated menu */
  .main-interface {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  /* Menu panel */
  .menu-panel {
    background-color: white;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .dark-mode .menu-panel {
    background-color: #2a2a2a;
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);
  }

  .menu-panel.active {
    max-height: 400px;
  }

  @media (max-width: 768px) {
    .keyboard-container.menu-open {
      transform: translateY(-80px);
    }

    .menu-panel {
      width: 95%;
    }
  }

  @media (max-width: 480px) {
    .keyboard-container.menu-open {
      transform: translateY(-60px);
    }

    .menu-panel.active {
      max-height: 300px;
    }
  }
</style>
