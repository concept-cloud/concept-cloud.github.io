import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function Home() {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>My Concept Cloud</h1>
      <p>Instantly capture, tag, and expand your story ideas—wherever inspiration strikes.</p>
    </section>
  );
}

// … other pages unchanged …

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
        <Link to="/about" style={{ margin: '0 1rem' }}>About</Link>
        <Link to="/terms" style={{ margin: '0 1rem' }}>Terms</Link>
        {/* no Link to /beta so it stays hidden */}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* …other routes… */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}
