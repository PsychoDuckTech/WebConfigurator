<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  
  // Application state
  const isConnected = writable(false);
  const isDemo = writable(false);
  const deviceInfo = writable(null);
  const showConfig = writable(false);
  const darkMode = writable(false);
  const activeTab = writable(null);
  const selectedKey = writable(null);
  const activeProfile = writable('Default');
  
  // Keyboard configuration state
  const activeLayer = writable(0);
  const lightingMode = writable('static');
  const lightingColor = writable('#FFAB07');
  const brightness = writable(100);
  const speed = writable(50);
  
  // Layers with key bindings
  const layers = writable([
    { id: 0, name: 'Layer 1' },
    { id: 1, name: 'Layer 2' },
    { id: 2, name: 'Layer 3' }
  ]);
  
  // Key bindings for each layer
  const keyBindings = writable({
    0: {}, // Layer 1 bindings
    1: {}, // Layer 2 bindings
    2: {}  // Layer 3 bindings
  });
  
  // Key binding types
  const bindingTypes = [
    { id: 'standard', name: 'Standard Key' },
    { id: 'macro', name: 'Macro' },
    { id: 'media', name: 'Media Control' },
    { id: 'layer_toggle', name: 'Layer Toggle' },
    { id: 'layer_hold', name: 'Layer Hold' },
    { id: 'modifier', name: 'Modifier Key' },
    { id: 'shortcut', name: 'Application Shortcut' }
  ];
  
  let selectedBindingType = 'standard';
  let macroText = '';
  let targetLayer = 0;
  
  // Underglow effects
  const lightingModes = [
    { id: 'static', name: 'Static' },
    { id: 'breathing', name: 'Breathing' },
    { id: 'rainbow', name: 'Rainbow Wave' },
    { id: 'reactive', name: 'Reactive' },
    { id: 'ripple', name: 'Ripple' },
    { id: 'audio', name: 'Audio Reactive' },
    { id: 'gradient', name: 'Gradient Shift' },
    { id: 'wave', name: 'Wave' },
    { id: 'starlight', name: 'Starlight' }
  ];
  
  // RGB colors for underglow
  let underglowColors = [
    { id: 0, color: '#FFAB07', active: true },
    { id: 1, color: '#9983FF', active: true },
    { id: 2, color: '#F6465D', active: true },
    { id: 3, color: '#00FF00', active: false },
    { id: 4, color: '#00FFFF', active: false },
    { id: 5, color: '#FFFFFF', active: false },
    { id: 6, color: '#FF00FF', active: false }
  ];
  
  // Standard keyboard layout (75% layout)
  const standardLayout = [
    // Row 1
    [
      { key: 'Esc', code: 'Escape', x: 0, y: 0, w: 1, h: 1, color: 'yellow' },
      { key: 'F1', code: 'F1', x: 1.5, y: 0, w: 1, h: 1 },
      { key: 'F2', code: 'F2', x: 2.5, y: 0, w: 1, h: 1 },
      { key: 'F3', code: 'F3', x: 3.5, y: 0, w: 1, h: 1 },
      { key: 'F4', code: 'F4', x: 4.5, y: 0, w: 1, h: 1 },
      { key: 'F5', code: 'F5', x: 5.5, y: 0, w: 1, h: 1 },
      { key: 'F6', code: 'F6', x: 6.5, y: 0, w: 1, h: 1 },
      { key: 'F7', code: 'F7', x: 7.5, y: 0, w: 1, h: 1 },
      { key: 'F8', code: 'F8', x: 8.5, y: 0, w: 1, h: 1 },
      { key: 'F9', code: 'F9', x: 9.5, y: 0, w: 1, h: 1 },
      { key: 'F10', code: 'F10', x: 10.5, y: 0, w: 1, h: 1 },
      { key: 'F11', code: 'F11', x: 11.5, y: 0, w: 1, h: 1 },
      { key: 'F12', code: 'F12', x: 12.5, y: 0, w: 1, h: 1 },
      { key: 'PRT', code: 'PrintScreen', x: 14, y: 0, w: 1, h: 1, color: 'yellow' },
      { key: 'INS', code: 'Insert', x: 15, y: 0, w: 1, h: 1, color: 'yellow' },
      { key: 'Del', code: 'Delete', x: 16, y: 0, w: 1, h: 1, color: 'yellow' }
    ],
    // Row 2
    [
      { key: '`', code: 'Backquote', x: 0, y: 1, w: 1, h: 1 },
      { key: '1', code: 'Digit1', x: 1, y: 1, w: 1, h: 1 },
      { key: '2', code: 'Digit2', x: 2, y: 1, w: 1, h: 1 },
      { key: '3', code: 'Digit3', x: 3, y: 1, w: 1, h: 1 },
      { key: '4', code: 'Digit4', x: 4, y: 1, w: 1, h: 1 },
      { key: '5', code: 'Digit5', x: 5, y: 1, w: 1, h: 1 },
      { key: '6', code: 'Digit6', x: 6, y: 1, w: 1, h: 1 },
      { key: '7', code: 'Digit7', x: 7, y: 1, w: 1, h: 1 },
      { key: '8', code: 'Digit8', x: 8, y: 1, w: 1, h: 1 },
      { key: '9', code: 'Digit9', x: 9, y: 1, w: 1, h: 1 },
      { key: '0', code: 'Digit0', x: 10, y: 1, w: 1, h: 1 },
      { key: '-', code: 'Minus', x: 11, y: 1, w: 1, h: 1 },
      { key: '=', code: 'Equal', x: 12, y: 1, w: 1, h: 1 },
      { key: 'BACK', code: 'Backspace', x: 13, y: 1, w: 2, h: 1 },
      { key: 'HOME', code: 'Home', x: 16, y: 1, w: 1, h: 1 }
    ],
    // Row 3
    [
      { key: 'TAB', code: 'Tab', x: 0, y: 2, w: 1.5, h: 1 },
      { key: 'Q', code: 'KeyQ', x: 1.5, y: 2, w: 1, h: 1 },
      { key: 'W', code: 'KeyW', x: 2.5, y: 2, w: 1, h: 1 },
      { key: 'E', code: 'KeyE', x: 3.5, y: 2, w: 1, h: 1 },
      { key: 'R', code: 'KeyR', x: 4.5, y: 2, w: 1, h: 1 },
      { key: 'T', code: 'KeyT', x: 5.5, y: 2, w: 1, h: 1 },
      { key: 'Y', code: 'KeyY', x: 6.5, y: 2, w: 1, h: 1 },
      { key: 'U', code: 'KeyU', x: 7.5, y: 2, w: 1, h: 1 },
      { key: 'I', code: 'KeyI', x: 8.5, y: 2, w: 1, h: 1 },
      { key: 'O', code: 'KeyO', x: 9.5, y: 2, w: 1, h: 1 },
      { key: 'P', code: 'KeyP', x: 10.5, y: 2, w: 1, h: 1 },
      { key: '[', code: 'BracketLeft', x: 11.5, y: 2, w: 1, h: 1 },
      { key: ']', code: 'BracketRight', x: 12.5, y: 2, w: 1, h: 1 },
      { key: '\\', code: 'Backslash', x: 13.5, y: 2, w: 1.5, h: 1 },
      { key: 'END', code: 'End', x: 16, y: 2, w: 1, h: 1 }
    ],
    // Row 4
    [
      { key: 'CAPS', code: 'CapsLock', x: 0, y: 3, w: 1.75, h: 1 },
      { key: 'A', code: 'KeyA', x: 1.75, y: 3, w: 1, h: 1 },
      { key: 'S', code: 'KeyS', x: 2.75, y: 3, w: 1, h: 1 },
      { key: 'D', code: 'KeyD', x: 3.75, y: 3, w: 1, h: 1 },
      { key: 'F', code: 'KeyF', x: 4.75, y: 3, w: 1, h: 1 },
      { key: 'G', code: 'KeyG', x: 5.75, y: 3, w: 1, h: 1 },
      { key: 'H', code: 'KeyH', x: 6.75, y: 3, w: 1, h: 1 },
      { key: 'J', code: 'KeyJ', x: 7.75, y: 3, w: 1, h: 1 },
      { key: 'K', code: 'KeyK', x: 8.75, y: 3, w: 1, h: 1 },
      { key: 'L', code: 'KeyL', x: 9.75, y: 3, w: 1, h: 1 },
      { key: ';', code: 'Semicolon', x: 10.75, y: 3, w: 1, h: 1 },
      { key: '\'', code: 'Quote', x: 11.75, y: 3, w: 1, h: 1 },
      { key: 'ENTER', code: 'Enter', x: 12.75, y: 3, w: 2.25, h: 1, color: 'yellow' },
      { key: 'PGUP', code: 'PageUp', x: 16, y: 3, w: 1, h: 1 }
    ],
    // Row 5
    [
      { key: 'SHIFT', code: 'ShiftLeft', x: 0, y: 4, w: 2.25, h: 1 },
      { key: 'Z', code: 'KeyZ', x: 2.25, y: 4, w: 1, h: 1 },
      { key: 'X', code: 'KeyX', x: 3.25, y: 4, w: 1, h: 1 },
      { key: 'C', code: 'KeyC', x: 4.25, y: 4, w: 1, h: 1 },
      { key: 'V', code: 'KeyV', x: 5.25, y: 4, w: 1, h: 1 },
      { key: 'B', code: 'KeyB', x: 6.25, y: 4, w: 1, h: 1 },
      { key: 'N', code: 'KeyN', x: 7.25, y: 4, w: 1, h: 1 },
      { key: 'M', code: 'KeyM', x: 8.25, y: 4, w: 1, h: 1 },
      { key: ',', code: 'Comma', x: 9.25, y: 4, w: 1, h: 1 },
      { key: '.', code: 'Period', x: 10.25, y: 4, w: 1, h: 1 },
      { key: '/', code: 'Slash', x: 11.25, y: 4, w: 1, h: 1 },
      { key: 'SHIFT', code: 'ShiftRight', x: 12.25, y: 4, w: 2.75, h: 1 },
      { key: '↑', code: 'ArrowUp', x: 15, y: 4, w: 1, h: 1, color: 'yellow' },
      { key: 'PGDN', code: 'PageDown', x: 16, y: 4, w: 1, h: 1 }
    ],
    // Row 6
    [
      { key: 'CTRL', code: 'ControlLeft', x: 0, y: 5, w: 1.25, h: 1 },
      { key: 'WIN', code: 'MetaLeft', x: 1.25, y: 5, w: 1.25, h: 1 },
      { key: 'ALT', code: 'AltLeft', x: 2.5, y: 5, w: 1.25, h: 1 },
      { key: '', code: 'Space', x: 3.75, y: 5, w: 6.25, h: 1, color: 'yellow' },
      { key: 'ALT', code: 'AltRight', x: 10, y: 5, w: 1.25, h: 1 },
      { key: 'FN', code: 'ContextMenu', x: 11.25, y: 5, w: 1.25, h: 1 },
      { key: 'CTRL', code: 'ControlRight', x: 12.5, y: 5, w: 1.25, h: 1 },
      { key: '←', code: 'ArrowLeft', x: 14, y: 5, w: 1, h: 1, color: 'yellow' },
      { key: '↓', code: 'ArrowDown', x: 15, y: 5, w: 1, h: 1, color: 'yellow' },
      { key: '→', code: 'ArrowRight', x: 16, y: 5, w: 1, h: 1, color: 'yellow' }
    ]
  ];
  
  // Initialize key bindings for each layer
  onMount(() => {
    // Default layer (Layer 1) has standard key bindings
    let layer1Bindings = {};
    standardLayout.forEach(row => {
      row.forEach(key => {
        layer1Bindings[key.code] = {
          type: 'standard',
          value: key.code,
          display: key.key
        };
      });
    });
    
    // Layer 2 and 3 start empty
    let layer2Bindings = {};
    let layer3Bindings = {};
    
    $keyBindings = {
      0: layer1Bindings,
      1: layer2Bindings,
      2: layer3Bindings
    };
  });
  
  // USB Serial connection
  let port;
  let reader;
  let writer;
  
  async function connectDevice() {
    if ($isDemo) {
      $isConnected = true;
      $showConfig = true;
      return;
    }
    
    try {
      port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
      
      reader = port.readable.getReader();
      writer = port.writable.getWriter();
      
      // Send initial handshake
      const encoder = new TextEncoder();
      await writer.write(encoder.encode('HELLO\n'));
      
      // Read device info
      const { value, done } = await reader.read();
      if (!done) {
        const decoder = new TextDecoder();
        const data = JSON.parse(decoder.decode(value));
        $deviceInfo = data;
        
        // Load configuration from device
        await writer.write(encoder.encode('GET_CONFIG\n'));
        const { value: configData } = await reader.read();
        const config = JSON.parse(decoder.decode(configData));
        
        // Update stores with device configuration
        $layers = config.layers;
        $keyBindings = config.keyBindings;
        $lightingMode = config.lightingMode;
        $lightingColor = config.lightingColor;
        $brightness = config.brightness;
        $speed = config.speed;
        underglowColors = config.underglowColors;
      }
      
      $isConnected = true;
      $showConfig = true;
      
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to connect to device. Please try again or use Demo mode.');
    }
  }
  
  async function disconnectDevice() {
    if (!$isDemo && port) {
      await writer.write(new TextEncoder().encode('BYE\n'));
      writer.releaseLock();
      reader.releaseLock();
      await port.close();
    }
    
    $isConnected = false;
    $showConfig = false;
    $isDemo = false;
  }
  
  function startDemo() {
    $isDemo = true;
    $isConnected = true;
    $showConfig = true;
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    $darkMode = !$darkMode;
    if ($darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
  // Key binding customization
  function handleKeySelect(key) {
    $selectedKey = key;
    if ($activeTab !== 'keybindings') {
      $activeTab = 'keybindings';
    }
    
    // Set the current binding type based on the key's binding
    const binding = $keyBindings[$activeLayer][key.code];
    if (binding) {
      selectedBindingType = binding.type;
      if (binding.type === 'macro') {
        macroText = binding.value;
      } else if (binding.type === 'layer_toggle' || binding.type === 'layer_hold') {
        targetLayer = binding.value;
      }
    } else {
      selectedBindingType = 'standard';
      macroText = '';
      targetLayer = 0;
    }
  }
  
  async function updateKeyBinding() {
    if ($selectedKey) {
      // Create the new binding
      let newBinding = {
        type: selectedBindingType,
        value: '',
        display: ''
      };
      
      // Set the binding value based on type
      if (selectedBindingType === 'standard') {
        newBinding.value = $selectedKey.code;
        newBinding.display = $selectedKey.key;
      } else if (selectedBindingType === 'macro') {
        newBinding.value = macroText;
        newBinding.display = 'MACRO';
      } else if (selectedBindingType === 'layer_toggle') {
        newBinding.value = targetLayer;
        newBinding.display = `TO:${targetLayer+1}`;
      } else if (selectedBindingType === 'layer_hold') {
        newBinding.value = targetLayer;
        newBinding.display = `MO:${targetLayer+1}`;
      } else if (selectedBindingType === 'media') {
        newBinding.value = document.getElementById('mediaAction').value;
        newBinding.display = 'MEDIA';
      }
      
      // Update the key bindings store
      $keyBindings = {
        ...$keyBindings,
        [$activeLayer]: {
          ...$keyBindings[$activeLayer],
          [$selectedKey.code]: newBinding
        }
      };
      
      // Send to device if connected
      if ($isConnected && !$isDemo && port) {
        const command = {
          action: 'SET_KEY_BINDING',
          layer: $activeLayer,
          keyCode: $selectedKey.code,
          binding: newBinding
        };
        
        await writer.write(new TextEncoder().encode(JSON.stringify(command) + '\n'));
      }
      
      $selectedKey = null;
    }
  }
  
  // Update board time
  async function updateBoardTime() {
    if ($isConnected) {
      const now = new Date();
      const timeString = now.toISOString();
      
      if (!$isDemo && port) {
        await writer.write(new TextEncoder().encode(`SET_TIME ${timeString}\n`));
      }
      
      alert('Board time updated successfully!');
    }
  }
  
  // Custom slider component state and handlers
  let isDraggingBrightness = false;
  let isDraggingSpeed = false;
  let startX, startValue;
  
  function handleSliderMouseDown(e, type) {
    if (type === 'brightness') {
      isDraggingBrightness = true;
      startX = e.clientX;
      startValue = $brightness;
    } else {
      isDraggingSpeed = true;
      startX = e.clientX;
      startValue = $speed;
    }
    
    window.addEventListener('mousemove', handleSliderMouseMove);
    window.addEventListener('mouseup', handleSliderMouseUp);
  }
  
  async function handleSliderMouseMove(e) {
    if (isDraggingBrightness) {
      const sliderWidth = document.querySelector('.brightness-slider').offsetWidth;
      const delta = e.clientX - startX;
      const newValue = Math.max(0, Math.min(100, startValue + (delta / sliderWidth * 100)));
      brightness.set(newValue);
      
      if ($isConnected && !$isDemo && port) {
        await writer.write(new TextEncoder().encode(`SET_BRIGHTNESS ${newValue}\n`));
      }
    }
    
    if (isDraggingSpeed) {
      const sliderWidth = document.querySelector('.speed-slider').offsetWidth;
      const delta = e.clientX - startX;
      const newValue = Math.max(0, Math.min(100, startValue + (delta / sliderWidth * 100)));
      speed.set(newValue);
      
      if ($isConnected && !$isDemo && port) {
        await writer.write(new TextEncoder().encode(`SET_SPEED ${newValue}\n`));
      }
    }
  }
  
  function handleSliderMouseUp() {
    isDraggingBrightness = false;
    isDraggingSpeed = false;
    window.removeEventListener('mousemove', handleSliderMouseMove);
    window.removeEventListener('mouseup', handleSliderMouseUp);
  }
  
  // Get key display text based on current layer
  function getKeyDisplay(key) {
    const binding = $keyBindings[$activeLayer][key.code];
    if (binding) {
      return binding.display;
    }
    return key.key;
  }
</script>

<main class:dark-mode={$darkMode}>
  {#if !$showConfig}
    <!-- Landing Page -->
    <div class="landing-page">
      <div class="logo-container">
        <img src="" alt="logo" class="logo" />
      </div>
      
      <div class="content-container">
        <h1 class="title">WebConfigurator</h1>
        <p class="subtitle">customize your keyboard</p>
        
        <div class="button-container">
          <button class="connect-button" on:click={connectDevice}>
            <span class="status-dot"></span>
            connect
            <svg viewBox="0 0 24 24" class="arrow-icon">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
          
          <button class="demo-button" on:click={startDemo}>
            Try Demo
          </button>
        </div>
      </div>
      
      <div class="version">0.0.1 β</div>
    </div>
  {:else}
    <!-- Configuration Interface -->
    <header>
      <div class="logo">
        <span class="duck-emoji">🦆</span>
        <h1>PsychoDuck Tech</h1>
      </div>
      
      <button class="dark-mode-toggle" on:click={toggleDarkMode}>
        {#if $darkMode}
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        {/if}
      </button>
    </header>
    
    <div class="keyboard-container" class:menu-open={$activeTab !== null}>
      <div class="keyboard">
        <!-- Side display panel -->
        <div class="side-display">
          <div class="display-values">
            <div class="display-value">{new Date().toLocaleTimeString()}</div>
            <div class="display-value">{new Date().toLocaleDateString()}</div>
          </div>
          <div class="music-player">
            <div class="track-info">Now Playing: Spotify</div>
            <div class="controls">
              <button class="control-btn">⏮</button>
              <button class="control-btn">▶</button>
              <button class="control-btn">⏭</button>
            </div>
            <div class="progress-dots">
              <span class="dot active"></span>
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
        
        <!-- Keyboard layout -->
        <div class="keyboard-layout">
          {#each standardLayout as row, rowIndex}
            <div class="key-row">
              {#each row as key}
                <button 
                  class="key {key.color || ''} {$selectedKey === key ? 'selected' : ''}"
                  style="
                    grid-column: span {key.w};
                    grid-row: span {key.h};
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
    </div>
    
    <!-- Main interface with integrated menu system -->
    <div class="main-interface">
      <!-- Bottom bar with integrated menu -->
      <div class="bottom-bar">
        <div class="nav-buttons">
          <button 
            class="nav-btn {$activeTab === 'keybindings' ? 'active' : ''}" 
            on:click={() => $activeTab = $activeTab === 'keybindings' ? null : 'keybindings'}
            title="Key Bindings"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z" />
            </svg>
          </button>
          <button 
            class="nav-btn {$activeTab === 'layers' ? 'active' : ''}" 
            on:click={() => $activeTab = $activeTab === 'layers' ? null : 'layers'}
            title="Layers"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" />
            </svg>
          </button>
          <button 
            class="nav-btn {$activeTab === 'lighting' ? 'active' : ''}" 
            on:click={() => $activeTab = $activeTab === 'lighting' ? null : 'lighting'}
            title="Lighting"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
            </svg>
          </button>
          <button 
            class="nav-btn {$activeTab === 'options' ? 'active' : ''}" 
            on:click={() => $activeTab = $activeTab === 'options' ? null : 'options'}
            title="Keyboard Options"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z" />
            </svg>
          </button>
        </div>
        
        <div class="status-info">
          <div class="product-info">
            <div class="product-name">PROTOTYPE 0</div>
            <div class="connection-status">{$isConnected ? 'CONNECTED' : 'DISCONNECTED'}</div>
          </div>
          
          <button 
            class="disconnect-btn" 
            on:click={$isConnected ? disconnectDevice : connectDevice}
          >
            {$isConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>
      
      <!-- Integrated menu panels -->
      {#if $activeTab}
        <div class="menu-panel" class:active={$activeTab !== null}>
          {#if $activeTab === 'keybindings'}
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
                      {#each bindingTypes as type}
                        <option value={type.id}>{type.name}</option>
                      {/each}
                    </select>
                  </div>
                  
                  {#if selectedBindingType === 'standard'}
                    <div class="form-group">
                      <label for="keyAction">Key:</label>
                      <div class="key-input-container">
                        <input type="text" id="keyAction" placeholder="Press a key" />
                        <div class="key-suggestions">
                          <button class="key-suggestion">A</button>
                          <button class="key-suggestion">B</button>
                          <button class="key-suggestion">C</button>
                          <button class="key-suggestion">1</button>
                          <button class="key-suggestion">2</button>
                          <button class="key-suggestion">3</button>
                        </div>
                      </div>
                    </div>
                  {:else if selectedBindingType === 'macro'}
                    <div class="form-group">
                      <label for="macroText">Macro Sequence:</label>
                      <textarea id="macroText" bind:value={macroText} placeholder="Type your macro sequence" rows="3"></textarea>
                      <div class="macro-builder">
                        <button class="macro-btn">+ Key</button>
                        <button class="macro-btn">+ Delay</button>
                        <button class="macro-btn">+ Mouse</button>
                        <button class="macro-btn">+ Text</button>
                      </div>
                      <p class="hint">Example: CTRL+C, delay 100, CTRL+V</p>
                    </div>
                    <div class="form-group">
                      <div class="checkbox-group">
                        <label>
                          <input type="checkbox" /> Play once
                        </label>
                        <label>
                          <input type="checkbox" checked /> Play while pressed
                        </label>
                        <label>
                          <input type="checkbox" /> Toggle on press
                        </label>
                      </div>
                    </div>
                  {:else if selectedBindingType === 'layer_toggle' || selectedBindingType === 'layer_hold'}
                    <div class="form-group">
                      <label for="targetLayer">Target Layer:</label>
                      <select id="targetLayer" bind:value={targetLayer}>
                        {#each $layers as layer}
                          <option value={layer.id}>{layer.name}</option>
                        {/each}
                      </select>
                    </div>
                    {#if selectedBindingType === 'layer_toggle'}
                      <p class="hint">Key will toggle to the selected layer when pressed</p>
                    {:else}
                      <p class="hint">Layer is active only while key is held down</p>
                    {/if}
                  {:else if selectedBindingType === 'media'}
                    <div class="form-group">
                      <label for="mediaAction">Media Action:</label>
                      <select id="mediaAction">
                        <option value="play_pause">Play/Pause</option>
                        <option value="next">Next Track</option>
                        <option value="prev">Previous Track</option>
                        <option value="vol_up">Volume Up</option>
                        <option value="vol_down">Volume Down</option>
                        <option value="mute">Mute</option>
                      </select>
                    </div>
                  {/if}
                  
                  <div class="actions">
                    <button class="btn primary" on:click={() => updateKeyBinding()}>Apply</button>
                    <button class="btn" on:click={() => $selectedKey = null}>Cancel</button>
                  </div>
                </div>
              {:else}
                <div class="instruction">
                  <p>Select a key on the keyboard to configure its binding</p>
                  <div class="key-preview">
                    <div class="key-preview-item">
                      <div class="key-preview-icon yellow"></div>
                      <span>Special Function</span>
                    </div>
                    <div class="key-preview-item">
                      <div class="key-preview-icon"></div>
                      <span>Standard Key</span>
                    </div>
                    <div class="key-preview-item">
                      <div class="key-preview-icon selected"></div>
                      <span>Selected Key</span>
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          {:else if $activeTab === 'layers'}
            <div class="panel-content">
              <h3>Layer Management</h3>
              <p class="explanation">Create and manage keyboard layers for different functions</p>
              
              <div class="layer-list">
                {#each $layers as layer}
                  <div class="layer-item {$activeLayer === layer.id ? 'active' : ''}">
                    <span class="layer-name">{layer.name}</span>
                    <div class="layer-actions">
                      <button 
                        class="btn small" 
                        on:click={() => $activeLayer = layer.id}
                        disabled={$activeLayer === layer.id}
                      >
                        Activate
                      </button>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {:else if $activeTab === 'lighting'}
            <div class="panel-content">
              <h3>Keyboard Underglow</h3>
              <p class="explanation">Customize the RGB lighting effects around your keyboard</p>
              
              <div class="form-group">
                <label for="lightingMode">Effect Mode:</label>
                <select id="lightingMode" bind:value={$lightingMode}>
                  {#each lightingModes as mode}
                    <option value={mode.id}>{mode.name}</option>
                  {/each}
                </select>
              </div>
              
              <div class="color-palette">
                <h4>Color Palette (up to 7 colors)</h4>
                <div class="color-slots">
                  {#each underglowColors as colorObj, index}
                    <div class="color-slot {colorObj.active ? 'active' : ''}">
                      <input 
                        type="color" 
                        value={colorObj.color}
                      />
                      <button 
                        class="color-toggle" 
                        title={colorObj.active ? 'Disable color' : 'Enable color'}
                      >
                        {colorObj.active ? '✓' : '+'}
                      </button>
                    </div>
                  {/each}
                </div>
              </div>
              
              <div class="form-group">
                <label for="brightness">Brightness:</label>
                <div class="custom-slider brightness-slider" on:mousedown={(e) => handleSliderMouseDown(e, 'brightness')}>
                  <div class="slider-track"></div>
                  <div class="slider-fill" style="width: {$brightness}%"></div>
                  <div class="slider-handle" style="left: {$brightness}%"></div>
                </div>
                <div class="range-labels">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="speed">Effect Speed:</label>
                <div class="custom-slider speed-slider" on:mousedown={(e) => handleSliderMouseDown(e, 'speed')}>
                  <div class="slider-track"></div>
                  <div class="slider-fill" style="width: {$speed}%"></div>
                  <div class="slider-handle" style="left: {$speed}%"></div>
                </div>
                <div class="range-labels">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>
          {:else if $activeTab === 'options'}
            <div class="panel-content">
              <h3>Keyboard Options</h3>
              <p class="explanation">Configure additional hardware features</p>
              
              <div class="form-group">
                <button class="btn primary" on:click={updateBoardTime}>Update Board Time</button>
                <p class="option-description">Synchronize the keyboard's clock with your computer</p>
              </div>
              
              <div class="form-group">
                <button class="btn primary" disabled={!$isConnected}>Apply Changes</button>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #DED8CB;
    color: #141414;
    overflow-x: hidden;
    transition: background-color 0.3s, color 0.3s;
  }
  
  :global(body.dark-mode) {
    background-color: #141414;
    color: #DED8CB;
  }
  
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .dark-mode {
    background-color: #141414;
    color: #DED8CB;
  }
  
  /* Landing page styles */
  .landing-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .logo-container {
    padding: 1.5rem;
  }
  
  .logo {
    height: 50px;
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
    background-color: #9983FF;
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
    background-color: #8066DD;
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    background-color: #4ADE80;
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
    background-color: #E5E5E5;
    color: #666;
    border: none;
    border-radius: 9999px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .demo-button:hover {
    background-color: #D5D5D5;
  }
  
  .version {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    font-family: monospace;
    font-size: 0.75rem;
    color: #666;
  }
  
  /* Configuration interface styles */
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
  }
  
  .dark-mode-toggle:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .dark-mode .dark-mode-toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .dark-mode-toggle svg {
    fill: currentColor;
  }
  
  .keyboard-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    flex: 1;
    transition: transform 0.3s ease;
    margin-bottom: 200px; /* Space for the menu panel */
  }
  
  .keyboard-container.menu-open {
    transform: translateY(-100px); /* Move keyboard up when menu is open */
  }
  
  .keyboard {
    --key-size: 45px;
    --key-spacing: 0px; /* No spacing between keys */
    position: relative;
    background-color: #e0e0e0;
    border-radius: 25px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 15px solid #9983FF;
    display: flex;
    max-width: 100%;
    overflow-x: auto;
  }
  
  .dark-mode .keyboard {
    background-color: #2a2a2a;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  .side-display {
    width: 120px;
    height: 300px;
    background-color: #141414;
    border-radius: 10px;
    margin-right: 20px;
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
  }
  
  .progress-dots {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #555;
  }
  
  .dot.active {
    background-color: #FFAB07;
  }
  
  .keyboard-layout {
    display: grid;
    grid-template-rows: repeat(6, var(--key-size));
    gap: var(--key-spacing);
    position: relative;
  }
  
  .key-row {
    display: grid;
    grid-template-columns: repeat(17, var(--key-size));
    gap: var(--key-spacing);
    position: relative;
    height: var(--key-size);
  }
  
  .key {
    position: absolute;
    background-color: #ddd;
    border: 1px solid #bbb;
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
    background-color: #FFAB07;
    border-color: #E69900;
  }
  
  .key.selected {
    background-color: #9983FF;
    border-color: #8066DD;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 3;
  }
  
  .key-text {
    color: inherit;
  }
  
  .dark-mode .key {
    background-color: #444;
    border-color: #555;
  }
  
  .dark-mode .key:hover {
    background-color: #555;
  }
  
  /* Main interface with integrated menu */
  .main-interface {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  
  /* Bottom bar */
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
    color: #9983FF;
  }
  
  .nav-btn svg {
    fill: white;
    width: 24px;
    height: 24px;
  }
  
  .nav-btn.active svg {
    fill: #9983FF;
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
    background-color: #F6465D;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    min-width: 100px; /* Fixed width for the button */
    text-align: center;
  }
  
  .disconnect-btn:hover {
    background-color: #E03545;
  }
  
  /* Menu panel */
  .menu-panel {
    background-color: white;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .dark-mode .menu-panel {
    background-color: #2a2a2a;
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .menu-panel.active {
    max-height: 400px;
  }
  
  .panel-content {
    padding: 1.5rem;
    max-height: 350px;
    overflow-y: auto;
  }
  
  .panel-content h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .dark-mode .panel-content h3 {
    color: #DED8CB;
  }
  
  .explanation {
    color: #666;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  .dark-mode .explanation {
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
  .form-group input[type="number"],
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    color: #141414;
  }
  
  .dark-mode .form-group input[type="text"],
  .dark-mode .form-group input[type="number"],
  .dark-mode .form-group select,
  .dark-mode .form-group textarea {
    background-color: #333;
    border-color: #444;
    color: #DED8CB;
  }
  
  /* Custom slider styles */
  .custom-slider {
    position: relative;
    width: 100%;
    height: 6px;
    background-color: #e0e0e0;
    border-radius: 3px;
    margin: 1rem 0;
    cursor: pointer;
  }
  
  .dark-mode .custom-slider {
    background-color: #444;
  }
  
  .slider-track {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
  
  .slider-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #9983FF;
    border-radius: 3px;
  }
  
  .slider-handle {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    background-color: #9983FF;
    border: 2px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s;
  }
  
  .dark-mode .slider-handle {
    border-color: #222;
  }
  
  .slider-handle:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  .slider-handle:active {
    cursor: grabbing;
    transform: translate(-50%, -50%) scale(1.2);
  }
  
  .range-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.25rem;
  }
  
  .dark-mode .range-labels {
    color: #aaa;
  }
  
  .hint {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.25rem;
  }
  
  .dark-mode .hint {
    color: #aaa;
  }
  
  .option-description {
    margin-top: 0.25rem;
    font-size: 0.8rem;
    color: #666;
  }
  
  .dark-mode .option-description {
    color: #aaa;
  }
  
  /* Enhanced key binding UI */
  .key-input-container {
    position: relative;
  }
  
  .key-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .key-suggestion {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
  }
  
  .dark-mode .key-suggestion {
    background-color: #333;
    border-color: #444;
    color: #DED8CB;
  }
  
  .key-suggestion:hover {
    background-color: #e0e0e0;
  }
  
  .dark-mode .key-suggestion:hover {
    background-color: #444;
  }
  
  .macro-builder {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }
  
  .macro-btn {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
  }
  
  .dark-mode .macro-btn {
    background-color: #333;
    border-color: #444;
    color: #DED8CB;
  }
  
  .macro-btn:hover {
    background-color: #e0e0e0;
  }
  
  .dark-mode .macro-btn:hover {
    background-color: #444;
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .checkbox-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: normal;
  }
  
  .checkbox-group input[type="checkbox"] {
    display: inline-block;
    margin: 0;
  }
  
  /* Key preview in instruction */
  .key-preview {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .key-preview-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .key-preview-icon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: #ddd;
    border: 1px solid #bbb;
  }
  
  .key-preview-icon.yellow {
    background-color: #FFAB07;
    border-color: #E69900;
  }
  
  .key-preview-icon.selected {
    background-color: #9983FF;
    border-color: #8066DD;
  }
  
  /* Color palette for underglow */
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
    border-color: #9983FF;
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
  
  .profile-list, .layer-list {
    margin-bottom: 1rem;
    max-height: 150px;
    overflow-y: auto;
  }
  
  .profile-item, .layer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .profile-item.active, .layer-item.active {
    background-color: #f0f0ff;
    border-left: 3px solid #9983FF;
  }
  
  .dark-mode .profile-item.active, 
  .dark-mode .layer-item.active {
    background-color: #333;
  }
  
  .profile-actions, .layer-actions {
    display: flex;
    gap: 0.5rem;
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
  
  .dark-mode .btn {
    background-color: #444;
    color: #DED8CB;
  }
  
  .btn:hover {
    background-color: #ddd;
  }
  
  .dark-mode .btn:hover {
    background-color: #555;
  }
  
  .btn.primary {
    background-color: #9983FF;
    color: white;
  }
  
  .btn.primary:hover {
    background-color: #8066DD;
  }
  
  .btn.danger {
    background-color: #F6465D;
    color: white;
  }
  
  .btn.danger:hover {
    background-color: #E03545;
  }
  
  .btn.small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
  
  .key-config {
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .dark-mode .key-config {
    background-color: #333;
  }
  
  .key-config h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #141414;
  }
  
  .dark-mode .key-config h4 {
    color: #DED8CB;
  }
  
  .instruction {
    text-align: center;
    color: #777;
    padding: 1rem 0;
  }
  
  .dark-mode .instruction {
    color: #aaa;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .keyboard {
      --key-size: 35px;
      padding: 1rem;
    }
    
    .side-display {
      width: 80px;
      height: 250px;
    }
    
    .display-values {
      font-size: 1.2rem;
    }
    
    .bottom-bar {
      width: 95%;
    }
    
    .menu-panel {
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
    
    .keyboard-container.menu-open {
      transform: translateY(-80px);
    }
  }
  
  @media (max-width: 480px) {
    .keyboard {
      --key-size: 25px;
      --key-spacing: 0px;
    }
    
    .side-display {
      display: none;
    }
    
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
    
    .menu-panel.active {
      max-height: 300px;
    }
    
    .panel-content {
      padding: 1rem;
      max-height: 250px;
    }
    
    .keyboard-container.menu-open {
      transform: translateY(-60px);
    }
  }
</style>