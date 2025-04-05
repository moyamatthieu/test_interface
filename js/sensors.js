class SensorData {
    constructor() {
        this.altitude = 0;
        this.speed = 0;
        this.wind = 15;
        this.battery = 100;
        this.pitch = 0;
        this.roll = 0;
    }
}

const sensors = new SensorData();

function updateSensorData() {
    // Simulation des données des capteurs
    sensors.altitude += (Math.random() - 0.5) * 2;
    sensors.speed = 5 + Math.random() * 3;
    sensors.wind = 15 + Math.sin(Date.now() / 10000) * 5;
    sensors.pitch += (Math.random() - 0.5) * 5;
    sensors.roll += (Math.random() - 0.5) * 5;
    
    // Mise à jour de l'affichage
    document.getElementById(AppConstants.DOM_ELEMENTS.CURRENT_ALTITUDE).textContent = sensors.altitude.toFixed(1) + ' m';
    document.getElementById(AppConstants.DOM_ELEMENTS.CURRENT_SPEED).textContent = sensors.speed.toFixed(1) + ' m/s';
    document.getElementById(AppConstants.DOM_ELEMENTS.CURRENT_WIND).textContent = sensors.wind.toFixed(1) + ' km/h';
    document.getElementById(AppConstants.DOM_ELEMENTS.DISPLAY_PITCH).textContent = sensors.pitch.toFixed(1) + ' °';
    document.getElementById(AppConstants.DOM_ELEMENTS.DISPLAY_ROLL).textContent = sensors.roll.toFixed(1) + ' °';
}
