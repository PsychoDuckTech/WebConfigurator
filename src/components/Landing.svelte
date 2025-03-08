<script>
    import { toggleConnection } from "../stores/keyboardStore.js";
</script>

<div class="landing-page">
    <div class="logo-container">
        <span class="duck-emoji">🦆</span>
        <h1>PsychoDuck Tech</h1>
    </div>

    <div class="content-container">
        <h1 class="title">WebConfigurator</h1>
        <p class="subtitle">customize your keyboard</p>

        <div class="button-container">
            <button class="connect-button" on:click={toggleConnection}>
                <span class="status-dot"></span>
                connect
                <svg viewBox="0 0 24 24" class="arrow-icon">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
            </button>

            <button class="demo-button" on:click={toggleConnection}>
                Try Demo
            </button>
        </div>
    </div>

    <div class="version">0.0.1 β</div>
</div>

<style>
    .landing-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .logo-container {
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .duck-emoji {
        font-size: 2rem;
    }

    .content-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: -5rem;
    }

    .title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    .subtitle {
        font-family: monospace;
        font-size: 1.25rem;
        color: #666;
        margin-bottom: 3rem;
    }

    .button-container {
        display: flex;
        gap: 1rem;
    }

    .connect-button {
        background-color: #9983ff;
        color: white;
        border: none;
        border-radius: 9999px;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .connect-button:hover {
        background-color: #8066dd;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        background-color: #4ade80;
        border-radius: 50%;
    }

    .arrow-icon {
        width: 16px;
        height: 16px;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .demo-button {
        background-color: #e5e5e5;
        color: #666;
        border: none;
        border-radius: 9999px;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .demo-button:hover {
        background-color: #d5d5d5;
    }

    .version {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        font-family: monospace;
        font-size: 0.75rem;
        color: #666;
    }
</style>
