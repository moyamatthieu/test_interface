class ESP32Communication {
    constructor() {
        this.ipAddress = '';
        this.port = 80;
        this.connected = false;
        this.ws = null;
    }

    connect(ip, port = 80) {
        this.ipAddress = ip;
        this.port = port;
        
        try {
            this.ws = new WebSocket(`ws://${this.ipAddress}:${this.port}/ws`);
            
            this.ws.onopen = () => {
                this.connected = true;
                updateConnectionStatus('Connecté', true);
            };
            
            this.ws.onclose = () => {
                this.connected = false;
                updateConnectionStatus('Déconnecté', false);
            };
            
            this.ws.onmessage = (event) => {
                this.handleMessage(JSON.parse(event.data));
            };
        } catch (error) {
            console.error('Erreur de connexion:', error);
            updateConnectionStatus('Erreur de connexion', false);
        }
    }

    sendCommand(command) {
        if (!this.connected) return false;
        this.ws.send(JSON.stringify(command));
        return true;
    }

    handleMessage(data) {
        switch(data.type) {
            case 'sensor':
                updateSensorData(data.values);
                break;
            case 'status':
                updateSystemStatus(data.status);
                break;
            case 'error':
                displayError(data.message);
                break;
        }
    }
}

const esp32 = new ESP32Communication();
