from machine import I2C, Pin
from time import sleep
import i2c_lcd

class LCDManager:
    def __init__(self, scl_pin, sda_pin, i2c_addr):
        self.i2c = I2C(0, scl=Pin(scl_pin), sda=Pin(sda_pin), freq=400000)
        self.lcd = i2c_lcd.I2cLcd(self.i2c, i2c_addr, 4, 20)  # 20x4 LCD
        
    def clear(self):
        self.lcd.clear()
        
    def display_status(self, wifi_status, ip="", battery=0, wind_speed=0):
        self.clear()
        self.lcd.move_to(0, 0)
        self.lcd.putstr(f"WiFi: {wifi_status}")
        self.lcd.move_to(0, 1)
        self.lcd.putstr(f"IP: {ip}")
        self.lcd.move_to(0, 2)
        self.lcd.putstr(f"Batterie: {battery}%")
        self.lcd.move_to(0, 3)
        self.lcd.putstr(f"Vent: {wind_speed}km/h")
