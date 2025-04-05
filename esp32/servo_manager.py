from machine import Pin, PWM
import config

class ServoManager:
    def __init__(self):
        # Initialisation des servomoteurs
        self.servo_left = PWM(Pin(config.SERVO_LEFT_PIN), freq=config.SERVO_FREQ)
        self.servo_right = PWM(Pin(config.SERVO_RIGHT_PIN), freq=config.SERVO_FREQ)
        self.servo_trim = PWM(Pin(config.SERVO_TRIM_PIN), freq=config.SERVO_FREQ)
        
        self.neutral_position = 90  # Position neutre en degrés
        self.neutral_trim = 50  # Position neutre du trim en pourcentage
        self.safe_trim = 0  # Position sécurisée du trim
        
        # Position initiale
        self.center_all()
    
    def _angle_to_duty(self, angle):
        # Convertit un angle (0-180) en duty cycle
        duty = int((angle / 180) * (config.SERVO_MAX_PULSE - config.SERVO_MIN_PULSE) + config.SERVO_MIN_PULSE)
        return duty
    
    def _control_to_angle(self, control_value):
        """Convertit une valeur de contrôle (-100 à +100) en angle (0-180)"""
        # Map -100,+100 to 0,180
        return int(((control_value + 100) / 200) * 180)
    
    def set_left(self, angle):
        self.servo_left.duty_u16(self._angle_to_duty(angle))
        
    def set_right(self, angle):
        self.servo_right.duty_u16(self._angle_to_duty(angle))
        
    def set_trim(self, angle):
        self.servo_trim.duty_u16(self._angle_to_duty(angle))
    
    def set_trim_percent(self, percent):
        """
        Règle le trim avec une valeur en pourcentage (0-100)
        50% = position neutre
        """
        # Conversion du pourcentage (0-100) en angle (0-180)
        angle = int((percent / 100) * 180)
        self.set_trim(angle)
    
    def center_all(self):
        # Position neutre (90°)
        self.set_left(90)
        self.set_right(90)
        self.set_trim(90)
        
    def pull_left(self, amount):
        # Tire sur la ligne gauche (0-100%)
        angle = 90 - (amount * 0.9)  # 90° ± max 90°
        self.set_left(max(0, min(180, angle)))
        
    def pull_right(self, amount):
        # Tire sur la ligne droite (0-100%)
        angle = 90 + (amount * 0.9)  # 90° ± max 90°
        self.set_right(max(0, min(180, angle)))
    
    def set_line_control(self, left_value, right_value):
        """
        Contrôle les lignes avec des valeurs entre -100 et +100
        -100 = relâché complet
        0 = neutre
        +100 = tiré complet
        """
        left_angle = self._control_to_angle(left_value)
        right_angle = self._control_to_angle(right_value)
        
        self.set_left(left_angle)
        self.set_right(right_angle)
    
    def set_safe_position(self):
        """Place les servos en position sécurisée"""
        self.set_line_control(0, 0)        # Lignes au neutre
        self.set_trim_percent(self.safe_trim)  # Trim à 0%
    
    def reset_to_neutral(self):
        """Remet les servos en position neutre"""
        self.set_line_control(0, 0)
        self.set_trim_percent(self.neutral_trim)
    
    def emergency_stop(self):
        """Arrêt d'urgence - Position sécurisée immédiate"""
        self.set_safe_position()
        for servo in [self.servo_left, self.servo_right, self.servo_trim]:
            servo.deinit()  # Désactive les sorties PWM
            
    def check_limits(self, value, min_val, max_val):
        """Vérifie les limites de sécurité"""
        return max(min_val, min(max_val, value))
