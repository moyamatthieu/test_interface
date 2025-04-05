# Ce fichier s'exécute à chaque démarrage de l'ESP32
import main

if __name__ == "__main__":
    controller = main.KiteController()
    controller.run()
