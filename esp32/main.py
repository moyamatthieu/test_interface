import network
import time
from machine import Pin
import config
from lcd_manager import LCDManager
from servo_manager import ServoManager

class KiteController:
    def __init__(self):
        # Initialisation du LCD
        self.lcd = LCDManager(config.LCD_SCL_PIN, config.LCD_SDA_PIN, config.LCD_I2C_ADDR)
        self.wlan = network.WLAN(network.STA_IF)
        self.servos = ServoManager()
        self.kite_state = {
            "left_control": 0,     # -100 à +100
            "right_control": 0,    # -100 à +100
            "trim": 50            # 0 à 100 (50 = neutre)
        }
        
    def connect_wifi(self):
        self.lcd.display_status("Connexion...")
        
        if not self.wlan.active():
            self.wlan.active(True)
        
        if not self.wlan.isconnected():
            self.wlan.connect(config.WIFI_SSID, config.WIFI_PASSWORD)
            
            # Attente de la connexion
            max_wait = 10
            while max_wait > 0:
                if self.wlan.isconnected():
                    break
                max_wait -= 1
                time.sleep(1)
            
            if self.wlan.isconnected():
                ip = self.wlan.ifconfig()[0]
                self.lcd.display_status("Connecté", ip, 100, 0)
            else:
                self.lcd.display_status("Échec connexion")
    
    def control_kite(self, left_control=0, right_control=0, trim=50):
        """
        Contrôle le cerf-volant
        left_control, right_control: -100 à +100
        trim: 0-100 pourcent
        """
        # Limite les valeurs dans leur plage
        left_control = max(-100, min(100, left_control))
        right_control = max(-100, min(100, right_control))
        trim = max(0, min(100, trim))
        
        self.kite_state["left_control"] = left_control
        self.kite_state["right_control"] = right_control
        self.kite_state["trim"] = trim
        
        self.servos.set_line_control(left_control, right_control)
        self.servos.set_trim_percent(trim)
    
    def run(self):
        # Reset au démarrage
        self.servos.reset_to_neutral()
        
        while True:
            if not self.wlan.isconnected():
                self.connect_wifi()
                
            # Mise à jour de l'affichage avec l'état des contrôles
            self.lcd.display_status(
                "Connecté" if self.wlan.isconnected() else "Déconnecté",
                self.wlan.ifconfig()[0] if self.wlan.isconnected() else "",
                left=self.kite_state["left_control"],
                right=self.kite_state["right_control"]
            )
            
            time.sleep(0.1)  # Réduit le délai pour une meilleure réactivité

# Démarrage du programme
if __name__ == "__main__":
    controller = KiteController()
    controller.run()
