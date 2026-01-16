let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

canvas.addEventListener("mousedown", e => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

window.addEventListener("mouseup", () => {
    isDragging = false;
});

canvas.addEventListener("mousemove", e => {
    if (!isDragging) return;

    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;

    camera.x -= dx / camera.zoom;
    camera.y -= dy / camera.zoom;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

window.addEventListener("keydown", e => {
    const speed = 20 / camera.zoom;

    if (e.key === "w" || e.key === "z") camera.y -= speed;
    if (e.key === "s") camera.y += speed;
    if (e.key === "a" || e.key === "q") camera.x -= speed;
    if (e.key === "d") camera.x += speed;
});

canvas.addEventListener("wheel", e => {
    e.preventDefault();

    const zoomAmount = e.deltaY > 0 ? 0.9 : 1.1;
    camera.zoom *= zoomAmount;

    camera.zoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.zoom));
});

canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();

    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    const worldX = Math.floor(
        (screenX / camera.zoom + camera.x) / TILE_SIZE
    );
    const worldY = Math.floor(
        (screenY / camera.zoom + camera.y) / TILE_SIZE
    );

    const tile = getTile(worldX, worldY);

    if (tile === 1) setTile(worldX, worldY, 2);
});