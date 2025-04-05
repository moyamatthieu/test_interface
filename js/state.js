export const AppConstants = {
    UPDATE_INTERVAL_MS: 50,
    MAX_LOG_LINES: 100,
    BATTERY: {
        RECHARGE_RATE: 0.15,
        DRAIN: {
            HOVER: 0.01,
            PATTERN: 0.02,
            LAND: 0.005,
            MANUAL_IDLE: 0.002,
            MANUAL_ACTION: 0.01
        }
    }
};

export const AppState = {
    autopilotActive: false,
    selectedBehavior: 'hover',
    battery: 100,
    altitude: 0,
    speed: 0,
    wind: 15,
    pitch: 0,
    roll: 0,
    errorCount: 0
};
