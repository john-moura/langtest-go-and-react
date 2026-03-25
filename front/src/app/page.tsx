'use client';

import React from 'react'
import { Provider } from 'react-redux'
import 'core-js'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('./App'), { ssr: false })
import store from './store'

const Dashboard: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
};

export default Dashboard;