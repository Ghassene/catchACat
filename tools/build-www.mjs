// Copie le jeu (catchACat.html) dans www/index.html pour l'appli,
// en remplaçant les polices Google par les polices locales (jeu jouable sans internet).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = readFileSync('catchACat.html', 'utf8');
const lines = src.split('\n').filter(l => !l.includes('fonts.googleapis.com'));
let html = lines.join('\n');
if (html.includes('fonts.googleapis.com')) throw new Error('Lien Google Fonts encore présent');
html = html.replace('<title>Attrape-Minou</title>', '<title>Attrape-Minou</title>\n<link rel="stylesheet" href="fonts/fonts.css">');
if (!html.includes('fonts/fonts.css')) throw new Error('Balise <title> introuvable');
mkdirSync('www', { recursive: true });
writeFileSync('www/index.html', html);
console.log('www/index.html prêt');
