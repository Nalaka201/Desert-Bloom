import React from 'react';
import Home from '../../pages/Home';
import Login from '../../pages/Login';

const RootRoute = () => {
    const token = localStorage.getItem('access_token');
    return token ? <Login /> : <Home />;
};

export default RootRoute;