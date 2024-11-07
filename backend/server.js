const express = require('express');
const app = express();
app.use(express.json());

let requests = [];

app.post('/api/requests', (req, res) => {
  const { employeeName, date, timeOff, status = 'pending' } = req.body;
  const id = requests.length + 1;
  requests.push({ id, employeeName, date, timeOff, status });
  res.status(201).send({ message: 'Request created', request: { id, employeeName, date, timeOff, status } });
});

app.patch('/api/requests/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const request = requests.find(r => r.id === parseInt(id));
  if (!request) return res.status(404).send({ message: 'Request not found' });
  request.status = status;
  res.send({ message: `Request ${status}`, request });
});

app.get('/api/requests', (req, res) => {
  res.send(requests);
});

app.listen(5001, () => console.log('Server running on port 5001'));
