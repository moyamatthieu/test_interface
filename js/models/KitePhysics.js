class KitePhysics {
    constructor(params = {}) {
        this.rho = params.rho || 1.225; // Densité de l'air (kg/m³)
        this.area = params.area || 10;   // Surface du cerf-volant (m²)
        this.cL = params.cL || 1.2;      // Coefficient de portance
        this.cD = params.cD || 0.1;      // Coefficient de traînée
        this.tetherDragCoeff = params.tetherDragCoeff || 0.05; // Traînée du câble
    }

    calculateLift(windEffective) {
        return 0.5 * this.rho * this.area * this.cL * Math.pow(windEffective, 2);
    }

    calculateDrag(windEffective) {
        return 0.5 * this.rho * this.area * this.cD * Math.pow(windEffective, 2);
    }

    calculateTetherDrag(lineLength) {
        return this.tetherDragCoeff * lineLength;
    }

    calculateGlideRatio(windEffective, lineLength) {
        const lift = this.calculateLift(windEffective);
        const drag = this.calculateDrag(windEffective);
        const tetherDrag = this.calculateTetherDrag(lineLength);
        return lift / (drag + tetherDrag);
    }
}
