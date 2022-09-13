import React from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Shop } from './components/Shop';

function App() {
    return (
        <React.Fragment>
            <Header />
            <Shop />
            <Footer />
        </React.Fragment>
    );
}

export default App;
