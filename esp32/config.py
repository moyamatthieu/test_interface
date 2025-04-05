# Configuration WiFi
WIFI_SSID = "VotreSSID"
WIFI_PASSWORD = "VotreMotDePasse"

# Configuration des pins
SERVO_LEFT_PIN = 13    # GPIO13
SERVO_RIGHT_PIN = 12   # GPIO12
SERVO_TRIM_PIN = 14    # GPIO14
LCD_SCL_PIN = 22      # GPIO22
LCD_SDA_PIN = 21      # GPIO21

# Configuration LCD
LCD_I2C_ADDR = 0x27   # Adresse I2C standard

# Configuration servomoteurs
SERVO_FREQ = 50        # Fréquence PWM en Hz
SERVO_MIN_PULSE = 500  # Durée min en µs
SERVO_MAX_PULSE = 2500 # Durée max en µs

# Paramètres de sécurité
WIFI_TIMEOUT = 10      # Délai max de connexion en secondes
SAFE_MODE_DELAY = 0.5  # Délai avant position sécurisée
BATTERY_MIN_VOLTAGE = 4.8  # Tension minimale en volts
