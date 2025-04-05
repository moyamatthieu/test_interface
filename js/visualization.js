function updateKiteVisualization() {
    const canvas = document.getElementById(AppConstants.DOM_ELEMENTS.KITE_CANVAS);
    const ctx = canvas.getContext('2d');
    
    // Ajuster la taille du canvas pour correspondre à son conteneur
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculer l'échelle en fonction de la longueur de ligne
    const lineLength = parseFloat(document.getElementById(AppConstants.DOM_ELEMENTS.LINE_LENGTH_INPUT).value);
    const scale = Math.min(canvas.width, canvas.height) * 0.4 / lineLength;
    
    // Dessiner la grille et l'échelle
    drawGrid(ctx, canvas.width, canvas.height, scale);
    
    // Dessiner l'indicateur de vent
    drawWindIndicator(ctx, canvas.width, canvas.height, sensors.wind);
    
    // Calculer la position du kite
    const kiteDistance = lineLength * Math.sqrt(
        Math.pow(Math.sin(sensors.pitch * Math.PI/180), 2) + 
        Math.pow(Math.sin(sensors.roll * Math.PI/180), 2)
    );
    const kiteAngle = Math.atan2(
        Math.sin(sensors.roll * Math.PI/180),
        Math.sin(sensors.pitch * Math.PI/180)
    );
    
    const kiteX = canvas.width/2 + Math.sin(kiteAngle) * kiteDistance * scale;
    const kiteY = canvas.height/2 - Math.cos(kiteAngle) * kiteDistance * scale;
    
    // Dessiner la ligne
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(kiteX, kiteY);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Dessiner le point d'ancrage
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#475569';
    ctx.fill();
    
    // Dessiner le kite
    drawKite(ctx, kiteX, kiteY, kiteAngle);
}

function drawGrid(ctx, width, height, scale) {
    const gridSize = 10; // Distance en mètres entre les lignes de la grille
    
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    
    // Dessiner les cercles concentriques
    for (let r = gridSize; r <= 50; r += gridSize) {
        ctx.beginPath();
        ctx.arc(width/2, height/2, r * scale, 0, Math.PI * 2);
        ctx.stroke();
        
        // Ajouter les labels de distance
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter';
        ctx.fillText(`${r}m`, width/2 + r * scale, height/2 + 12);
    }
}

function drawWindIndicator(ctx, width, height, windSpeed) {
    const radius = 30;
    const x = width - radius - 20;
    const y = radius + 20;
    
    // Cercle de fond
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.stroke();
    
    // Flèche de vent
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-Math.PI/2); // Le vent souffle du nord par défaut
    
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.7);
    ctx.lineTo(0, radius * 0.7);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#3b82f6';
    ctx.stroke();
    
    // Tête de flèche
    ctx.beginPath();
    ctx.moveTo(-6, radius * 0.5);
    ctx.lineTo(0, radius * 0.7);
    ctx.lineTo(6, radius * 0.5);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
    
    ctx.restore();
    
    // Texte vitesse du vent
    ctx.font = 'bold 12px Inter';
    ctx.fillStyle = '#1e3a8a';
    ctx.textAlign = 'center';
    ctx.fillText(`${windSpeed.toFixed(1)} km/h`, x, y + radius + 15);
}

function drawKite(ctx, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle - Math.PI/2);
    
    // Corps du cerf-volant
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(8, 12);
    ctx.lineTo(0, 8);
    ctx.lineTo(-8, 12);
    ctx.closePath();
    
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.restore();
}
