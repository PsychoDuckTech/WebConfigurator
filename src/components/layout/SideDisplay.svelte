<script>
    import { time } from "../../stores/keyboardStore.js";

    // Format time to 24-hour format without seconds
    $: formattedTime =
        $time.getHours().toString().padStart(2, "0") +
        "\n" +
        $time.getMinutes().toString().padStart(2, "0");
</script>

<div class="side-display">
    <div class="display-values">
        <div class="display-value">{formattedTime}</div>
    </div>
    <div class="music-player">
        <div class="track-info">Now Playing</div>
        <div class="controls">
            <button class="control-btn">▶</button>
        </div>
    </div>
</div>

<style>
    .side-display {
        width: 100px;
        height: 150px;
        background-color: #141414;
        border-radius: 10px;
        margin-right: 10px;
        margin-top: 6rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        color: white;
    }

    .display-values {
        font-family: monospace;
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 2rem;
    }

    .music-player {
        margin-top: auto;
        border-top: 1px solid #444;
        padding-top: 1rem;
    }

    .track-info {
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }

    .controls {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .control-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        margin-left: auto;
        margin-top: -2rem;
    }

    @media (max-width: 480px) {
        .side-display {
            display: none;
        }
    }
</style>
