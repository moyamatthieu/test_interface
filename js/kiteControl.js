let autopilotActive = false;
let selectedBehavior = 'hover';

function handleModeChange(event) {
    const isAuto = event.target.value === 'auto';
    document.getElementById(AppConstants.DOM_ELEMENTS.AUTOPILOT_CONTROLS).style.display = isAuto ? 'block' : 'none';
    document.getElementById(AppConstants.DOM_ELEMENTS.MANUAL_CONTROLS).style.display = isAuto ? 'none' : 'block';
}

function handleBehaviorSelection(event) {
    const btn = event.target.closest('.behavior-btn');
    if (!btn) return;
    
    selectedBehavior = btn.dataset.behavior;
    document.querySelectorAll(AppConstants.DOM_ELEMENTS.BEHAVIOR_BTN_SELECTOR)
        .forEach(b => b.classList.remove('selected', 'active'));
    btn.classList.add('selected');
    
    if (autopilotActive) {
        btn.classList.add('active');
    }
}

function handleManualControl(event) {
    const btn = event.target.closest('.manual-btn');
    if (!btn) return;
    const action = btn.dataset.action;
    // Implémenter les actions manuelles ici
}

function toggleAutopilot() {
    autopilotActive = !autopilotActive;
    document.getElementById(AppConstants.DOM_ELEMENTS.AUTOPILOT_STATUS).textContent = 
        autopilotActive ? 'Actif' : 'Inactif';
    
    document.querySelectorAll(AppConstants.DOM_ELEMENTS.BEHAVIOR_BTN_SELECTOR)
        .forEach(btn => {
            if (btn.dataset.behavior === selectedBehavior) {
                btn.classList.toggle('active', autopilotActive);
            } else {
                btn.classList.toggle('disabled-behavior', autopilotActive);
            }
        });
}

function updateBatteryStatus() {
    // Simuler la consommation/recharge de la batterie
    if (autopilotActive) {
        switch(selectedBehavior) {
            case 'hover':
                sensors.battery -= AppConstants.BATTERY_DRAIN_HOVER;
                break;
            case 'power_gen':
                sensors.battery += AppConstants.BATTERY_RECHARGE_RATE;
                break;
            case 'pattern':
                sensors.battery -= AppConstants.BATTERY_DRAIN_PATTERN;
                break;
            case 'land':
                sensors.battery -= AppConstants.BATTERY_DRAIN_LAND;
                break;
        }
    } else {
        sensors.battery -= AppConstants.BATTERY_DRAIN_MANUAL_IDLE;
    }
    
    sensors.battery = Math.min(Math.max(sensors.battery, 0), 100);
    document.getElementById(AppConstants.DOM_ELEMENTS.CURRENT_BATTERY).textContent = 
        sensors.battery.toFixed(1) + ' %';
}
