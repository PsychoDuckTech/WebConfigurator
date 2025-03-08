<script>
    import "boxicons/css/boxicons.min.css";
    import {
        activeTab,
        isConnected,
        toggleConnection,
    } from "../../stores/keyboardStore.js";
</script>

<div class="bottom-bar">
    <div class="nav-buttons">
        <button
            class="nav-btn {$activeTab === 'keybindings' ? 'active' : ''}"
            on:click={() =>
                ($activeTab =
                    $activeTab === "keybindings" ? null : "keybindings")}
            title="Key Bindings"
        >
            <i class="bx bxs-keyboard"></i>
        </button>
        <button
            class="nav-btn {$activeTab === 'profiles' ? 'active' : ''}"
            on:click={() =>
                ($activeTab = $activeTab === "profiles" ? null : "profiles")}
            title="Profiles"
        >
            <i class="bx bxs-layer"></i>
        </button>
        <button
            class="nav-btn {$activeTab === 'lighting' ? 'active' : ''}"
            on:click={() =>
                ($activeTab = $activeTab === "lighting" ? null : "lighting")}
            title="Lighting"
        >
            <i class="bx bxs-bulb"></i>
        </button>
        <button
            class="nav-btn {$activeTab === 'options' ? 'active' : ''}"
            on:click={() =>
                ($activeTab = $activeTab === "options" ? null : "options")}
            title="Keyboard Options"
        >
            <i class="bx bxs-cog"></i>
        </button>
    </div>

    <div class="status-info">
        <div class="product-info">
            <div class="product-name">PROTOTYPE 0</div>
            <div class="connection-status">
                {$isConnected ? "CONNECTED" : "DISCONNECTED"}
            </div>
        </div>

        <button class="disconnect-btn" on:click={toggleConnection}>
            {$isConnected ? "Disconnect" : "Connect"}
        </button>
    </div>
</div>

<style>
    .bottom-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #141414;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        margin: 0 auto 0;
        width: 90%;
        max-width: 1200px;
    }

    .nav-buttons {
        display: flex;
        gap: 1.5rem;
    }

    .nav-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: all 0.2s;
    }

    .nav-btn:hover {
        background-color: #333;
    }

    .nav-btn.active {
        background-color: #333;
        color: #9983ff;
    }

    .nav-btn bx {
        fill: white;
        width: 32px;
        height: 32px;
    }

    .nav-btn.active bx {
        fill: #9983ff;
    }

    .status-info {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .product-info {
        text-align: right;
        color: white;
    }

    .product-name {
        font-size: 1rem;
        font-weight: bold;
    }

    .connection-status {
        font-size: 0.8rem;
    }

    .disconnect-btn {
        background-color: #f6465d;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
        min-width: 120px; /* Fixed width for the button */
        text-align: center;
    }

    .disconnect-btn:hover {
        background-color: #e03545;
    }

    @media (max-width: 768px) {
        .bottom-bar {
            width: 95%;
        }

        .nav-buttons {
            gap: 0.75rem;
        }

        .nav-btn {
            width: 36px;
            height: 36px;
        }

        .disconnect-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        .bottom-bar {
            width: 95%;
            padding: 0.5rem;
        }

        .nav-buttons {
            gap: 0.5rem;
        }

        .nav-btn {
            width: 32px;
            height: 32px;
        }

        .nav-btn svg {
            width: 20px;
            height: 20px;
        }

        .disconnect-btn {
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
            min-width: 80px;
        }
    }
</style>
