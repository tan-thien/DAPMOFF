import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes'; // Ensure this is the correct path to your routes file

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        return (
                            <Route key={route.path} path={route.path} element={<Page />} /> // Fixed the quotes
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
