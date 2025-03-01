import React from 'react';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();

    const handleConnect = () => {

        //go to dashboard
        navigate('/dashboard');
    }
}

export default LandingPage