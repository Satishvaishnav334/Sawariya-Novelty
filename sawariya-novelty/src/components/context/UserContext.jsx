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
    
    const fetchProducts = async () => {
        try {
            setLoading(true)
            const res4 = await axios.get('/api/get-products');
            setTasks(res4.data)
            setLoading(false)
        } catch (err) {
            console.error('❌ Failed to fetch categories:', err);
        }
    };
    const fetchUsers = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/api/get-users`);
            setUsers(res.data)
            
            setLoading(false)
        } catch (err) {
            console.error('❌ Failed to fetch categories:', err);
        }
    };
    const fetchCat = async () => {
        try {
            setLoading(true)
         const res3 = await axios.get('/api/get-categories');
            setTeams(res3.data)
            setLoading(false)
        } catch (err) {
            console.error('❌ Failed to fetch categories:', err);
        }
    };
    const fetchUser = async () => {
        try {
            const name = getCookie('name')
            setLoading(true)
           const res2 = await axios.get(`/api/get-users/${name}`);
            setUser(res2.data)
            setLoading(false)
        } catch (err) {
            console.error('❌ Failed to fetch categories:', err);
        }
      
    };
 
    useEffect(() => {

        fetchProducts();
        fetchUsers()
        fetchUser()
        fetchCat()

    }, []);     
   
return (
    <UserDataContext.Provider value={{ user, users, refresh: fetchProducts, teams, tasks ,loading,setLoading}}>
        {children}
    </UserDataContext.Provider>
);
};

export const useUserDataContext = () => useContext(UserDataContext);
