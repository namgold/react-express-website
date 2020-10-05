import React from 'react';

const Loading = () => (
  <div style={{
    height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
  }}
  >
    <div>
      <div className="loading-spinner" />
      <h1>App is loading...</h1>
    </div>
  </div>
);

export default Loading;
