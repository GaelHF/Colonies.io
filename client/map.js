const MAP_WIDTH = 2000;
const MAP_HEIGHT = 1000;
const TILE_SIZE = 4;

const map = new Uint8Array(MAP_WIDTH * MAP_HEIGHT);
// 0 = eau & 1 = terre

function generateMap() { 
    for (let i = 0; i < map.length; i++) {
        map[i] = Math.random() > 0.45 ? 1 : 0;
    }
}

function getTile(x, y) {
    if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) return 0;
    return map[y * MAP_WIDTH + x];
}

function setTile(x, y, value) {
    if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) return;
    map[y * MAP_WIDTH + x] = value;
}

function generateMapFromImage(src, callback) {
  const img = new Image();
  img.src = src;

  img.onload = () => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = MAP_WIDTH;
    tempCanvas.height = MAP_HEIGHT;

    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(img, 0, 0, MAP_WIDTH, MAP_HEIGHT);

    const imageData = tempCtx.getImageData(0, 0, MAP_WIDTH, MAP_HEIGHT).data;

    for (let i = 0; i < MAP_WIDTH * MAP_HEIGHT; i++) {
        const r = imageData[i * 4];
        const g = imageData[i * 4 + 1];
        const b = imageData[i * 4 + 2];

        if (r > 128 && g > 128 && b > 128) {
            map[i] = 0; // eau (blanc = bleu)
        } else {
            map[i] = 1; // terre (noir = vert)
        }
    }

    console.log("✅ Carte générée depuis l'image");
    callback();
  };

  img.onerror = () => {
    console.error("❌ Impossible de charger l'image :", src);
    console.log("📌 Génération d'une carte aléatoire à la place");
    generateMap();
    callback();
  };
}