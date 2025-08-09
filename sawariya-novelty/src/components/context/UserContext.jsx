// context/CategoryContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { getCookie } from 'cookies-next/client';
const UserDataContext = createContext();

export const UserDataProvider = ({ children, name }) => {
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(false)
    
    const fetchContaxtData = async () => {
        try {
            setLoading(true)
            const name = getCookie('name')
            const res2 = await axios.get(`/api/get-users/${name}`);
            setUser(res2.data)
            const res = await axios.get(`/api/get-users`);
            setUsers(res.data)

            const res3 = await axios.get('/api/get-categories');
            setTeams(res3.data)

            const res4 = await axios.get('/api/get-products');
            setTasks(res4.data)

        } catch (err) {
            console.error('❌ Failed to fetch categories:', err);
        }
        finally{
             setLoading(false)
        }
    };
 
    useEffect(() => {

        fetchContaxtData();
        

    }, []);     
   
return (
    <UserDataContext.Provider value={{ user, users, refresh: fetchContaxtData, teams, tasks ,loading,setLoading}}>
        {children}
    </UserDataContext.Provider>
);
};

export const useUserDataContext = () => useContext(UserDataContext);
