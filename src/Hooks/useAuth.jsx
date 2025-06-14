import React from 'react';
// import { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
    return useContext(AuthContext);



};




export default useAuth;