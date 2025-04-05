import { AppState } from './state.js';

export class DOMManager {
    static init() {
        this.setupEventListeners();
        this.addLogMessage('Système initialisé', 'success');
    }

    static setupEventListeners() {
        document.getElementById('mode-auto').addEventListener('change', () => this.switchMode('auto'));
        document.getElementById('mode-manual').addEventListener('change', () => this.switchMode('manual'));
        
        // ...existing event listeners setup code...
    }

    // ...existing DOM management methods...
}
