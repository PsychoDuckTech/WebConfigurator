<script>
    import {
        lightingMode,
        lightingModes,
        brightness,
        speed,
        underglowColors,
        toggleColorActive,
    } from "../../stores/keyboardStore.js";
</script>

<div class="panel-content">
    <h3>Keyboard Underglow</h3>
    <p class="explanation">
        Customize the RGB lighting effects around your keyboard
    </p>

    <div class="form-group">
        <label for="lightingMode">Effect Mode:</label>
        <select id="lightingMode" bind:value={$lightingMode}>
            {#each $lightingModes as mode}
                <option value={mode.id}>{mode.name}</option>
            {/each}
        </select>
    </div>

    <div class="color-palette">
        <h4>Color Palette</h4>
        <div class="color-slots">
            {#each $underglowColors as color, index}
                <div class="color-slot {color.active ? 'active' : ''}">
                    <input type="color" value={color.color} />
                    <button
                        class="color-toggle"
                        title={color.active ? "Disable color" : "Enable color"}
                        on:click={() => toggleColorActive(index)}
                    >
                        {color.active ? "✓" : "+"}
                    </button>
                </div>
            {/each}
        </div>
    </div>

    <div class="form-group">
        <label for="brightness">Brightness:</label>
        <input
            type="range"
            id="brightness"
            min="0"
            max="100"
            bind:value={$brightness}
        />
    </div>

    <div class="form-group">
        <label for="speed">Effect Speed:</label>
        <input type="range" id="speed" min="0" max="100" bind:value={$speed} />
    </div>
</div>

<style>
    .panel-content {
        padding: 1.5rem;
        max-height: 350px;
        overflow-y: auto;
    }

    h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .explanation {
        color: #666;
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    :global(.dark-mode) .explanation {
        color: #aaa;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    .form-group select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: white;
        color: #141414;
    }

    :global(.dark-mode) .form-group select {
        background-color: #333;
        border-color: #444;
        color: #ded8cb;
    }

    .form-group input[type="range"] {
        width: 100%;
    }

    .color-palette {
        margin-bottom: 1.5rem;
    }

    .color-palette h4 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1rem;
    }

    .color-slots {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 0.5rem;
    }

    .color-slot {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        overflow: hidden;
        border: 2px solid transparent;
        opacity: 0.5;
    }

    .color-slot.active {
        border-color: #9983ff;
        opacity: 1;
    }

    .color-slot input[type="color"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }

    .color-toggle {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px;
        height: 16px;
        background-color: rgba(255, 255, 255, 0.8);
        border: none;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        cursor: pointer;
        z-index: 1;
    }

    @media (max-width: 480px) {
        .panel-content {
            padding: 1rem;
            max-height: 250px;
        }
    }
</style>
