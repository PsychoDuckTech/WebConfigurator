<script>
    import { profiles, activateProfile } from "../../stores/keyboardStore.js";
</script>

<div class="panel-content">
    <h3>Saved Configurations</h3>
    <p class="explanation">
        Switch between different saved keyboard configurations
    </p>

    <div class="profile-list">
        {#each $profiles as profile}
            <div class="profile-item {profile.active ? 'active' : ''}">
                <span class="profile-name">{profile.name}</span>
                <div class="profile-actions">
                    <button
                        class="btn small primary"
                        on:click={() => activateProfile(profile.id)}
                        disabled={profile.active}
                    >
                        {profile.active ? "Active" : "Activate"}
                    </button>
                </div>
            </div>
        {/each}
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

    .profile-list {
        margin-bottom: 1rem;
        max-height: 150px;
        overflow-y: auto;
    }

    .profile-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }

    .profile-item.active {
        background-color: #f0f0ff;
        border-left: 3px solid #9983ff;
    }

    :global(.dark-mode) .profile-item.active {
        background-color: #333;
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

    .btn.small {
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 480px) {
        .panel-content {
            padding: 1rem;
            max-height: 250px;
        }
    }
</style>
