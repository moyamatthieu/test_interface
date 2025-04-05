# Système de Contrôle de Cerf-Volant

## Description
Système embarqué basé sur ESP32 pour le contrôle automatique d'un cerf-volant via servomoteurs.

## Structure du Projet
```
test_interface/
├── esp32/
│   ├── main.py         # Programme principal
│   ├── config.py       # Configuration
│   ├── servo_manager.py # Gestion des servomoteurs
│   ├── lcd_manager.py  # Gestion de l'écran LCD
│   └── boot.py        # Script de démarrage
├── Index.html         # Interface web
└── README.md         # Documentation
```

## Spécifications Techniques

### Contrôle des Servomoteurs
- **Lignes (Gauche/Droite)**
  - Plage: -100 à +100
  - -100 = Relâché maximum
  - 0 = Position neutre
  - +100 = Tiré maximum

- **Trim**
  - Plage: 0 à 100%
  - 0% = Position sécurisée
  - 50% = Position neutre
  - 100% = Maximum

### Matériel Requis
- ESP32
- 3 Servomoteurs
- Écran LCD I2C 20x4
- Alimentation 5V

### Connexions
- **Servomoteurs**
  - Gauche: GPIO13
  - Droite: GPIO12
  - Trim: GPIO14
- **LCD I2C**
  - SDA: GPIO21
  - SCL: GPIO22

## Installation
1. Flasher MicroPython sur l'ESP32
2. Copier les fichiers du dossier `esp32/` sur l'ESP32
3. Configurer les paramètres WiFi dans `config.py`
4. Redémarrer l'ESP32

## Utilisation
- Le système démarre en mode sécurisé (trim à 0%)
- L'interface web permet le contrôle manuel ou automatique
- L'écran LCD affiche l'état du système en temps réel

## Sécurité
- Position sécurisée automatique en cas de perte de connexion
- Limites logicielles sur tous les servomoteurs
- Surveillance continue de la tension d'alimentation