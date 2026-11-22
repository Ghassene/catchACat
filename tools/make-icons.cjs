// Dessine l'icône et l'écran de démarrage à partir des dessins du jeu (lancer : node tools/make-icons.cjs)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 400, height: 400 } });
  await p.goto('file://' + path.resolve('www/index.html'));
  await p.waitForTimeout(500);
  const shot = async (name, w, h, kind) => {
    const data = await p.evaluate(([w, h, kind]) => {
      const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
      window.__attrape.drawOn(g, ({ drawCat, drawBall, CATS, star }) => {
        const cat = CATS.find(c => c.id === 'caramel');
        if (kind !== 'fg') {
          const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, '#8FD3F4'); bg.addColorStop(1, '#BFE9FA');
          g.fillStyle = bg; g.fillRect(0, 0, w, h);
          g.fillStyle = '#6CC24A'; g.beginPath(); g.ellipse(w / 2, h * 1.02, w * .75, h * .28, 0, 0, Math.PI * 2); g.fill();
        }
        if (kind === 'bg') return;
        const m = Math.min(w, h), k = kind === 'splash' ? .55 : 1;
        const s = m * .2 * k, cx = w / 2, cy = h / 2 - m * .02 * k;
        g.fillStyle = '#FFF1A8';
        [[-.33, -.3, .05], [.34, -.27, .04], [.3, .1, .03]].forEach(([a, bb, r]) => { star(cx + a * m * k, cy + bb * m * k, r * m * k); g.fill(); });
        drawCat(cx, cy, s, cat, { happy: true });
        drawBall(cx + m * .18 * k, cy + m * .2 * k, m * .1 * k, -.3);
      });
      return c.toDataURL('image/png');
    }, [w, h, kind]);
    require('fs').writeFileSync(path.join('assets', name), Buffer.from(data.split(',')[1], 'base64'));
  };
  await shot('icon-only.png', 1024, 1024, 'full');
  await shot('icon-foreground.png', 1024, 1024, 'fg');
  await shot('icon-background.png', 1024, 1024, 'bg');
  await shot('splash.png', 2732, 2732, 'splash');
  await shot('splash-dark.png', 2732, 2732, 'splash');
  await b.close();
})();
