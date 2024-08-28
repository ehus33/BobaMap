// src/App.tsx

import React from 'react';
import Map from './components/Map';

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Boba Shops Around the World</h1>
      <Map />
    </div>
  );
};

export default App;
