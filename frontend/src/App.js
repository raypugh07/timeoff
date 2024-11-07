import React, { useState, useEffect } from 'react';

function App() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({ employeeName: '', date: '', timeOff: '' });

  useEffect(() => {
    fetch('/api/requests')
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setRequests([...requests, data.request]);
  };

  const handleStatusChange = async (id, status) => {
    await fetch(`/api/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
  };

  return (
    <div>
      <h1>Time-Off Scheduling System</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Employee Name"
          value={form.employeeName}
          onChange={e => setForm({ ...form, employeeName: e.target.value })}
          required
        />
        <input
          placeholder="Date"
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          placeholder="Time Off"
          value={form.timeOff}
          onChange={e => setForm({ ...form, timeOff: e.target.value })}
          required
        />
        <button type="submit">Submit Request</button>
      </form>

      <h2>Time-Off Requests</h2>
      <ul>
        {requests.map(req => (
          <li key={req.id}>
            {req.employeeName} - {req.date} - {req.timeOff} - Status: {req.status}
            <button onClick={() => handleStatusChange(req.id, 'approved')}>Approve</button>
            <button onClick={() => handleStatusChange(req.id, 'denied')}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
