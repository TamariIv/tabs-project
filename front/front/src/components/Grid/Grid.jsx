import React, { useState, useEffect } from 'react';
import styles from './Grid.module.css';
import Tab from '../Tab/Tab';

import { FaPlus } from "react-icons/fa";
import { getTabs, createTab, updateTab, deleteTab } from '../../service/service';
import { generateUniqueID } from '../../utils/utils';

const Grid = () => {
    const [tabs, setTabs] = useState([]); 
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                const tabData = await getTabs(); 
                setTabs(tabData); 
            } catch (err) {
                setError(err); 
            } finally {
                setLoading(false); 
            }
        };

        fetchTabs(); 
    }, []); 

    if (loading) {
        return <div>Loading...</div>; // Render loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Render error state
    }



    const handleCreate = () => {
        const newTab = {
            id: generateUniqueID(), 
            color: "gainsboro",
            text: "Lorem ipsum dolo r sit amet"
        };
        setTabs([...tabs, newTab]); // Update the tabs state with the new tab
        createTab(newTab);
    };

    const handleDelete = (id) => {
        setTabs(prevTabs => prevTabs.filter(tab => tab.id !== id));
        deleteTab(id);
    };

    const handleUpdate = (id, updated) => {
        setTabs(prevTabs =>
            prevTabs.map(tab =>
                tab.id === id ? { ...tab, ...updated } : tab
            )
        );
        updateTab(id, updated); 
    };




    return (

        <div className={styles.grid}>
            {tabs.map(tab => (
                <Tab
                    key={tab.id}
                    tab={tab}
                    deleteTab={() => handleDelete(tab.id)}
                    updateTab={handleUpdate} />
            ))}

            <div className={styles.addTab}>
                <FaPlus className={styles.plus} onClick={handleCreate} />
            </div>
        </div>

    );
};

export default Grid;