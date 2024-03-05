import expressApp from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
const app = expressApp();
const PORT = 3000;


app.use(expressApp.static(path.join(__dirname, 'dist')));

// Handle other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));