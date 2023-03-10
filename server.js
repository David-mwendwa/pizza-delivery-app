const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ success: true, page: 'Homepage' });
});

app.use('*', (req, res) => {
  res.send('Route does not exist');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
