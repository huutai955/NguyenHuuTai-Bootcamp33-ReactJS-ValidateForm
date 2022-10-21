import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormValidate from './pages/FormValidate/FormValidate';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate.jsx'
import { Provider } from 'react-redux'
import {store} from './redux/configStore.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<FormValidate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

