<script>
    import { buzzerEnabled, toggleBuzzer } from "../../stores/keyboardStore.js";

    function updateBoardTime() {
        alert("Board time updated successfully!");
    }
</script>

<div class="panel-content">
    <h3>Keyboard Options</h3>
    <p class="explanation">Configure additional hardware features</p>

    <div class="form-group">
        <button class="btn primary" on:click={updateBoardTime}
            >Update Board Time</button
        >
        <p class="option-description">
            Synchronize the keyboard's clock with your computer
        </p>
    </div>

    <div class="form-group">
        <div class="toggle-option">
            <label for="buzzerToggle">Internal Buzzer</label>
            <div
                class="toggle-switch"
                class:active={$buzzerEnabled}
                on:click={toggleBuzzer}
            >
                <div class="toggle-handle"></div>
            </div>
        </div>
        <p class="option-description">
            Enable or disable keyboard's audio feedback
        </p>
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

    .option-description {
        margin-top: 0.25rem;
        font-size: 0.8rem;
        color: #666;
    }

    :global(.dark-mode) .option-description {
        color: #aaa;
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

    .toggle-option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .toggle-switch {
        position: relative;
        width: 50px;
        height: 24px;
        background-color: #ddd;
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    :global(.dark-mode) .toggle-switch {
        background-color: #444;
    }

    .toggle-switch.active {
        background-color: #9983ff;
    }

    .toggle-handle {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        transition: transform 0.3s;
    }

    .toggle-switch.active .toggle-handle {
        transform: translateX(26px);
    }

    @media (max-width: 480px) {
        .panel-content {
            padding: 1rem;
            max-height: 250px;
        }
    }
</style>
