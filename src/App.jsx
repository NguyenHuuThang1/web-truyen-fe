import './App.css';
import React from 'react';

import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';
import { MyCarousel } from './components/MyCarousel';

function App() {
    return (
        <>
            <Header></Header>
            <MyCarousel />
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
}

export default App;
