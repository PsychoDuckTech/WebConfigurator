<script lang="ts">
    import { toggleDarkMode, darkMode } from "../../stores/keyboardStore.js";
</script>

<header>
    <div class="logo">
        <span class="duck-emoji">🦆</span>
        <p>PsychoDuck Tech</p>
    </div>

    <button class="dark-mode-toggle" on:click={toggleDarkMode}>
        {#if $darkMode}
            <i class="bx bx-moon"></i>
        {:else}
            <i class="bx bx-sun"></i>
        {/if}
    </button>
</header>

<style>
    header {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-family: monospace;
        font-size: 1.5rem;
    }

    .duck-emoji {
        font-size: 2rem;
    }

    .dark-mode-toggle {
        background: none;
        border: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
        z-index: 1000;
    }

    .dark-mode-toggle:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    :global(.dark-mode) .dark-mode-toggle:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .dark-mode-toggle svg {
        fill: currentColor;
    }
</style>
