const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

generateMapFromImage("assets/world.png", () => {
    console.log("🎮 Démarrage du jeu");
    
    // Centrer la caméra pour voir toute la carte
    camera.x = -((canvas.width / camera.zoom - MAP_WIDTH * TILE_SIZE) / 2);
    camera.y = -((canvas.height / camera.zoom - MAP_HEIGHT * TILE_SIZE) / 2);
    
    loop();
});

function drawMap() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const startX = Math.max(0, Math.floor(camera.x / TILE_SIZE));
    const startY = Math.max(0, Math.floor(camera.y / TILE_SIZE));

    const endX = Math.min(MAP_WIDTH, startX + Math.ceil(canvas.width / (TILE_SIZE * camera.zoom)) + 2);
    const endY = Math.min(MAP_HEIGHT, startY + Math.ceil(canvas.height / (TILE_SIZE * camera.zoom)) + 2);

    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            const tile = getTile(x, y);

            if (tile === 0) ctx.fillStyle = "#1e90ff";
            else if (tile === 1) ctx.fillStyle = "#3cb371";
            else if (tile === 2) ctx.fillStyle = "#ff4444";

            const drawX = Math.round((x * TILE_SIZE - camera.x) * camera.zoom);
            const drawY = Math.round((y * TILE_SIZE - camera.y) * camera.zoom);
            const drawWidth = Math.ceil(TILE_SIZE * camera.zoom);
            const drawHeight = Math.ceil(TILE_SIZE * camera.zoom);

            ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
        }
    }
}

function loop() {
    drawMap();
    requestAnimationFrame(loop);
}