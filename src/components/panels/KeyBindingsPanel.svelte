<script>
    import {
        selectedKey,
        activeLayer,
        layers,
        keyBindings,
    } from "../../stores/keyboardStore.js";

    let selectedBindingType = "standard";
    let keyDisplayText = "";

    // When selected key changes, set up the binding type
    $: if ($selectedKey) {
        const binding = $keyBindings[$activeLayer][$selectedKey.key];
        if (binding) {
            selectedBindingType = binding.type || "standard";
            keyDisplayText = binding.display;
        } else {
            selectedBindingType = "standard";
            keyDisplayText = $selectedKey.key;
        }
    }

    function applyKeyBinding() {
        if ($selectedKey) {
            // Create a new binding
            const newBinding = {
                type: selectedBindingType,
                display: keyDisplayText || $selectedKey.key,
            };

            // Update the key bindings
            const updatedBindings = { ...$keyBindings };
            if (!updatedBindings[$activeLayer]) {
                updatedBindings[$activeLayer] = {};
            }
            updatedBindings[$activeLayer][$selectedKey.key] = newBinding;

            $keyBindings = updatedBindings;
            $selectedKey = null;
        }
    }
</script>

<div class="panel-content">
    <h3>Key Binding Configuration</h3>
    <p class="explanation">Customize what each key does when pressed</p>

    <div class="layer-selector">
        <label for="activeLayer">Current Layer:</label>
        <select id="activeLayer" bind:value={$activeLayer}>
            {#each $layers as layer}
                <option value={layer.id}>{layer.name}</option>
            {/each}
        </select>
    </div>

    {#if $selectedKey}
        <div class="key-config">
            <h4>Configure: {$selectedKey.key}</h4>
            <div class="form-group">
                <label for="keyFunction">Function Type:</label>
                <select id="keyFunction" bind:value={selectedBindingType}>
                    <option value="standard">Standard Key</option>
                    <option value="macro">Macro</option>
                    <option value="media">Media Control</option>
                    <option value="layer_toggle">Layer Toggle</option>
                </select>
            </div>

            <div class="form-group">
                <label for="keyDisplayText">Key Display Text:</label>
                <input
                    type="text"
                    id="keyDisplayText"
                    bind:value={keyDisplayText}
                    placeholder="Text shown on key"
                    maxlength="6"
                />
            </div>

            <div class="actions">
                <button class="btn primary" on:click={applyKeyBinding}
                    >Apply</button
                >
                <button class="btn" on:click={() => ($selectedKey = null)}
                    >Cancel</button
                >
            </div>
        </div>
    {:else}
        <div class="instruction">
            <p>Select a key on the keyboard to configure its binding</p>
        </div>
    {/if}
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

    .form-group input[type="text"],
    .form-group select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: white;
        color: #141414;
    }

    :global(.dark-mode) .form-group input[type="text"],
    :global(.dark-mode) .form-group select {
        background-color: #333;
        border-color: #444;
        color: #ded8cb;
    }

    .key-config {
        background-color: #f9f9f9;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
    }

    :global(.dark-mode) .key-config {
        background-color: #333;
    }

    .key-config h4 {
        margin-top: 0;
        margin-bottom: 1rem;
        color: #141414;
    }

    :global(.dark-mode) .key-config h4 {
        color: #ded8cb;
    }

    .instruction {
        text-align: center;
        color: #777;
        padding: 1rem 0;
    }

    :global(.dark-mode) .instruction {
        color: #aaa;
    }

    .actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
        justify-content: flex-end;
    }

    .btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #eee;
        color: #141414;
        font-weight: 500;
        transition: all 0.2s;
    }

    :global(.dark-mode) .btn {
        background-color: #444;
        color: #ded8cb;
    }

    .btn:hover {
        background-color: #ddd;
    }

    :global(.dark-mode) .btn:hover {
        background-color: #555;
    }

    .btn.primary {
        background-color: #9983ff;
        color: white;
    }

    .btn.primary:hover {
        background-color: #8066dd;
    }

    @media (max-width: 480px) {
        .panel-content {
            padding: 1rem;
            max-height: 250px;
        }
    }
</style>
