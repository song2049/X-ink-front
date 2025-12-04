import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ButtonPlay from './playground/ButtonPlay';
import Header from './layouts/Header';
import TextPlay from './playground/TextPlay';
import Layout from './layouts/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/button" element={<ButtonPlay />} />
        <Route path="/header" element={<Header />} />
        <Route path="/text" element={<TextPlay />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
