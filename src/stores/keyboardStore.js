import { writable } from 'svelte/store';

// Core state
export const darkMode = writable(false);
export const showConfig = writable(false);
export const isConnected = writable(false);
export const activeTab = writable(null);
export const selectedKey = writable(null);
export const activeLayer = writable(0);
export const buzzerEnabled = writable(true);

// Lighting settings
export const lightingMode = writable('static');
export const brightness = writable(80);
export const speed = writable(50);

// Profiles
export const profiles = writable([
    { id: 'default', name: 'Default', active: true },
    { id: 'gaming', name: 'Gaming', active: false },
    { id: 'work', name: 'Work', active: false }
]);

// Layers
export const layers = writable([
    { id: 0, name: 'Layer 1' },
    { id: 1, name: 'Layer 2' },
    { id: 2, name: 'Layer 3' }
]);

// Lighting modes
export const lightingModes = writable([
    { id: 'static', name: 'Static' },
    { id: 'breathing', name: 'Breathing' },
    { id: 'rainbow', name: 'Rainbow Wave' },
    { id: 'reactive', name: 'Reactive' }
]);

// Colors for underglow
export const underglowColors = writable([
    { color: '#FFAB07', active: true },
    { color: '#9983FF', active: true },
    { color: '#F6465D', active: true },
    { color: '#00FF00', active: false }
]);

// Keyboard layout (75% layout)
export const keyboardLayout = writable([
    // Row 1
    [
        { key: 'Esc', x: 0, y: 0, w: 1, h: 1, color: 'yellow' },
        { key: 'F1', x: 1.25, y: 0, w: 1, h: 1 },
        { key: 'F2', x: 2.25, y: 0, w: 1, h: 1 },
        { key: 'F3', x: 3.25, y: 0, w: 1, h: 1 },
        { key: 'F4', x: 4.25, y: 0, w: 1, h: 1 },
        { key: 'F5', x: 5.25, y: 0, w: 1, h: 1 },
        { key: 'F6', x: 6.25, y: 0, w: 1, h: 1 },
        { key: 'F7', x: 7.25, y: 0, w: 1, h: 1 },
        { key: 'F8', x: 8.25, y: 0, w: 1, h: 1 },
        { key: 'F9', x: 9.25, y: 0, w: 1, h: 1 },
        { key: 'F10', x: 10.25, y: 0, w: 1, h: 1 },
        { key: 'F11', x: 11.25, y: 0, w: 1, h: 1 },
        { key: 'F12', x: 12.25, y: 0, w: 1, h: 1 },
        { key: 'PRT', x: 13.5, y: 0, w: 1, h: 1, color: 'yellow' },
        { key: 'INS', x: 14.5, y: 0, w: 1, h: 1, color: 'yellow' },
        { key: 'DEL', x: 15.75, y: 0, w: 1, h: 1, color: 'yellow' }
    ],
    // Row 2
    [
        { key: '`', x: 0, y: 1.25, w: 1.25, h: 1 },
        { key: '1', x: 1.25, y: 1.25, w: 1, h: 1 },
        { key: '2', x: 2.25, y: 1.25, w: 1, h: 1 },
        { key: '3', x: 3.25, y: 1.25, w: 1, h: 1 },
        { key: '4', x: 4.25, y: 1.25, w: 1, h: 1 },
        { key: '5', x: 5.25, y: 1.25, w: 1, h: 1 },
        { key: '6', x: 6.25, y: 1.25, w: 1, h: 1 },
        { key: '7', x: 7.25, y: 1.25, w: 1, h: 1 },
        { key: '8', x: 8.25, y: 1.25, w: 1, h: 1 },
        { key: '9', x: 9.25, y: 1.25, w: 1, h: 1 },
        { key: '0', x: 10.25, y: 1.25, w: 1, h: 1 },
        { key: '-', x: 11.25, y: 1.25, w: 1, h: 1 },
        { key: '=', x: 12.25, y: 1.25, w: 1, h: 1 },
        { key: 'BACK', x: 13.25, y: 1.25, w: 1.75, h: 1 },
        { key: 'HOME', x: 15.75, y: 1.25, w: 1, h: 1 }
    ],
    // Row 3
    [
        { key: 'TAB', x: 0, y: 2.25, w: 1.25, h: 1 },
        { key: 'Q', x: 1.25, y: 2.25, w: 1, h: 1 },
        { key: 'W', x: 2.25, y: 2.25, w: 1, h: 1 },
        { key: 'E', x: 3.25, y: 2.25, w: 1, h: 1 },
        { key: 'R', x: 4.25, y: 2.25, w: 1, h: 1 },
        { key: 'T', x: 5.25, y: 2.25, w: 1, h: 1 },
        { key: 'Y', x: 6.25, y: 2.25, w: 1, h: 1 },
        { key: 'U', x: 7.25, y: 2.25, w: 1, h: 1 },
        { key: 'I', x: 8.25, y: 2.25, w: 1, h: 1 },
        { key: 'O', x: 9.25, y: 2.25, w: 1, h: 1 },
        { key: 'P', x: 10.25, y: 2.25, w: 1, h: 1 },
        { key: '[', x: 11.25, y: 2.25, w: 1, h: 1 },
        { key: ']', x: 12.25, y: 2.25, w: 1, h: 1 },
        { key: '\\', x: 13.25, y: 2.25, w: 1.75, h: 1 },
        { key: 'END', x: 15.75, y: 2.25, w: 1, h: 1 }
    ],
    // Row 4
    [
        { key: 'CAPS', x: 0, y: 3.25, w: 1.25, h: 1 },
        { key: 'A', x: 1.25, y: 3.25, w: 1, h: 1 },
        { key: 'S', x: 2.25, y: 3.25, w: 1, h: 1 },
        { key: 'D', x: 3.25, y: 3.25, w: 1, h: 1 },
        { key: 'F', x: 4.25, y: 3.25, w: 1, h: 1 },
        { key: 'G', x: 5.25, y: 3.25, w: 1, h: 1 },
        { key: 'H', x: 6.25, y: 3.25, w: 1, h: 1 },
        { key: 'J', x: 7.25, y: 3.25, w: 1, h: 1 },
        { key: 'K', x: 8.25, y: 3.25, w: 1, h: 1 },
        { key: 'L', x: 9.25, y: 3.25, w: 1, h: 1 },
        { key: ';', x: 10.25, y: 3.25, w: 1, h: 1 },
        { key: '\'', x: 11.25, y: 3.25, w: 1, h: 1 },
        { key: 'ENTER', x: 12.25, y: 3.25, w: 2.75, h: 1, color: 'yellow' },
        { key: 'PGUP', x: 15.75, y: 3.25, w: 1, h: 1 }
    ],
    // Row 5
    [
        { key: 'SHIFT', x: 0, y: 4.25, w: 2.25, h: 1 },
        { key: 'Z', x: 2.25, y: 4.25, w: 1, h: 1 },
        { key: 'X', x: 3.25, y: 4.25, w: 1, h: 1 },
        { key: 'C', x: 4.25, y: 4.25, w: 1, h: 1 },
        { key: 'V', x: 5.25, y: 4.25, w: 1, h: 1 },
        { key: 'B', x: 6.25, y: 4.25, w: 1, h: 1 },
        { key: 'N', x: 7.25, y: 4.25, w: 1, h: 1 },
        { key: 'M', x: 8.25, y: 4.25, w: 1, h: 1 },
        { key: ',', x: 9.25, y: 4.25, w: 1, h: 1 },
        { key: '.', x: 10.25, y: 4.25, w: 1, h: 1 },
        { key: '/', x: 11.25, y: 4.25, w: 1, h: 1 },
        { key: 'SHIFT', x: 12.25, y: 4.25, w: 2, h: 1 },
        { key: '↑', x: 14.5, y: 4.5, w: 1, h: 1, color: 'yellow' },
        { key: 'PGDN', x: 15.75, y: 4.25, w: 1, h: 1 }
    ],
    // Row 6
    [
        { key: 'CTRL', x: 0, y: 5.25, w: 1.25, h: 1 },
        { key: 'SUP', x: 1.25, y: 5.25, w: 1, h: 1 },
        { key: 'S', x: 2.25, y: 5.25, w: 1, h: 1 },
        { key: 'ALT', x: 3.25, y: 5.25, w: 1, h: 1 },
        { key: '', x: 4.25, y: 5.25, w: 6, h: 1, color: 'yellow' },
        { key: 'ALT', x: 10.25, y: 5.25, w: 1, h: 1 },
        { key: 'S', x: 11.25, y: 5.25, w: 1, h: 1 },
        { key: 'CTRL', x: 12.25, y: 5.25, w: 1, h: 1 },
        { key: '←', x: 13.5, y: 5.50, w: 1, h: 1, color: 'yellow' },
        { key: '↓', x: 14.5, y: 5.50, w: 1, h: 1, color: 'yellow' },
        { key: '→', x: 15.5, y: 5.50, w: 1, h: 1, color: 'yellow' },
    ]
]);

// Mock key bindings for each layer
export const keyBindings = writable({
    0: {}, // Default layer
    1: {   // Layer 2 - Media controls
        'Q': { display: 'PREV' },
        'W': { display: 'PLAY' },
        'E': { display: 'NEXT' },
        'A': { display: 'CUT' },
        'S': { display: 'COPY' }
    },
    2: {   // Layer 3 - Numbers
        'Q': { display: '1' },
        'W': { display: '2' },
        'E': { display: '3' },
        'A': { display: '6' },
        'S': { display: '7' }
    }
});

// Time
export const time = writable(new Date());

// Functions
export function toggleDarkMode() {
    darkMode.update(value => !value);
}

export function toggleConnection() {
    isConnected.update(value => !value);
    if (isConnected) {
        showConfig.set(true);
    } else {
        showConfig.set(false);
    }
}

export function toggleBuzzer() {
    buzzerEnabled.update(value => !value);
}

export function activateProfile(id) {
    profiles.update(items =>
        items.map(profile => ({
            ...profile,
            active: profile.id === id
        }))
    );
}

export function toggleColorActive(index) {
    underglowColors.update(colors => {
        const newColors = [...colors];
        newColors[index].active = !newColors[index].active;
        return newColors;
    });
}

export function getKeyDisplay(key) {
    let result = key.key;
    activeLayer.subscribe(layer => {
        keyBindings.subscribe(bindings => {
            const binding = bindings[layer][key.key];
            if (binding) {
                result = binding.display;
            }
        });
    });
    return result;
}