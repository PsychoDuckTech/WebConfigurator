<script>
    import {
        keyboardLayout,
        selectedKey,
        activeTab,
        activeLayer,
        keyBindings,
    } from "../../stores/keyboardStore.js";
    import SideDisplay from "../layout/SideDisplay.svelte";

    // Handle key selection
    function handleKeySelect(key) {
        $selectedKey = key;
        if ($activeTab !== "keybindings") {
            $activeTab = "keybindings";
        }
    }

    // Get key display text based on current layer
    function getKeyDisplay(key) {
        const binding = $keyBindings[$activeLayer][key.key];
        return binding ? binding.display : key.key;
    }
</script>

<div class="keyboard">
    <!-- Knob -->
    <div class="knob"></div>

    <!-- Side display panel -->
    <SideDisplay />

    <!-- Keyboard layout -->
    <div class="keyboard-layout">
        {#each $keyboardLayout as row}
            <div class="key-row">
                {#each row as key}
                    <button
                        class="key {key.color || ''} {$selectedKey === key
                            ? 'selected'
                            : ''}"
                        style="
                left: calc({key.x} * var(--key-size));
                top: calc({key.y} * var(--key-size));
                width: calc({key.w} * var(--key-size));
                height: calc({key.h} * var(--key-size));
              "
                        on:click={() => handleKeySelect(key)}
                    >
                        <span class="key-text">{getKeyDisplay(key)}</span>
                    </button>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .keyboard {
        --key-size: 45px;
        position: relative;
        background-color: #d9d9d9;
        border-radius: 17px;
        padding: 0.8rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        display: flex;
        max-width: 100%;
        overflow-x: auto;
    }

    .knob {
        position: absolute;
        left: -20px; /* Adjust this value to control how much the knob goes off the left border */
        top: 50%;
        width: 20px;
        height: 60px;
        background-color: #555;
    }

    :global(.dark-mode) .keyboard {
        background-color: #2a2a2a;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .keyboard-layout {
        position: relative;
        height: 290px;
        width: 750px;
    }

    .key-row {
        position: relative;
    }

    .key {
        position: absolute;
        background-color: #ddd;
        border: 1px solid #bcbbb9;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1;
    }

    .key:hover {
        background-color: #eee;
        transform: translateY(-2px);
        z-index: 2;
    }

    .key.yellow {
        background-color: #ffab07;
        border-color: #e69900;
    }

    .key.selected {
        background-color: #9983ff;
        border-color: #8066dd;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 3;
    }

    .key-text {
        color: inherit;
    }

    :global(.dark-mode) .key {
        background-color: #444;
        border-color: #555;
    }

    :global(.dark-mode) .key:hover {
        background-color: #555;
    }

    @media (max-width: 768px) {
        .keyboard {
            --key-size: 35px;
            padding: 1.5rem;
        }

        .keyboard-layout {
            width: 580px;
            height: 250px;
        }
    }

    @media (max-width: 480px) {
        .keyboard {
            --key-size: 25px;
            padding: 1rem;
        }

        .keyboard-layout {
            width: 420px;
            height: 180px;
        }
    }
</style>
