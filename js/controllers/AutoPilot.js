class AutoPilot {
    constructor(kitePhysics) {
        this.kitePhysics = kitePhysics;
        this.state = {
            mode: 'traction', // 'traction' ou 'recovery'
            windSpeed: 0,
            lineLength: 100,
            altitude: 0,
            phase: 0 // Phase dans la trajectoire
        };
    }

    updateState(sensorData) {
        this.state = { ...this.state, ...sensorData };
        return this.calculateOptimalCommand();
    }

    calculateOptimalCommand() {
        const windEffective = this.calculateEffectiveWind();
        const glideRatio = this.kitePhysics.calculateGlideRatio(windEffective, this.state.lineLength);

        if (this.state.mode === 'traction') {
            return this.calculateTractionSpeed(glideRatio);
        } else {
            return this.calculateRecoverySpeed(glideRatio);
        }
    }

    calculateEffectiveWind() {
        return this.state.windSpeed * Math.cos(this.state.phase);
    }

    calculateTractionSpeed(glideRatio) {
        return glideRatio * 0.8; // Exemple de calcul simplifié
    }

    calculateRecoverySpeed(glideRatio) {
        return -glideRatio * 0.5; // Exemple de calcul simplifié
    }
}
