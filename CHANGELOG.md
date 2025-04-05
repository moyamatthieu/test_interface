# Journal des Modifications

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-01-21

### Ajouté
- Implémentation complète du modèle physique du cerf-volant
- Pilote automatique avec gestion des phases de traction/récupération
- Simulateur de vol en temps réel
- Calculs optimisés pour la génération d'énergie

## [1.0.0] - 2024-01-20

### Ajouté
- Interface de contrôle principale
- Mode manuel et pilote automatique
- Visualisation en temps réel
- Monitoring des paramètres système
- Comportements automatisés (maintien, génération, atterrissage, parcours)

### Modifié
- Optimisation de la visualisation du cerf-volant
- Amélioration de l'interface utilisateur

### Corrigé
- Correction des bugs d'affichage sur petits écrans
- Stabilisation du système de contrôle automatique

## [1.1.0] - 2024-01-21

### Ajouté
- Module de communication WiFi avec ESP32
- Interface de configuration de la connexion
- Protocole WebSocket pour communication en temps réel
- Gestion automatique de la reconnexion

### Modifié
- Intégration des données des capteurs en temps réel
- Amélioration de la gestion des erreurs
