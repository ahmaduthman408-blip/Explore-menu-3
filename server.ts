import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json');

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  app.get('/api/settings', (req, res) => {
    try {
      if (fs.existsSync(SETTINGS_FILE)) {
        res.json(JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8')));
      } else {
        res.json({});
      }
    } catch (e) {
      res.status(500).json({ error: 'Failed to read settings' });
    }
  });

  app.post('/api/settings', (req, res) => {
    try {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Failed to write settings' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
