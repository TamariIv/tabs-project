import React, { useState, useEffect } from 'react';
import styles from './Grid.module.css';
import Tab from '../Tab/Tab';

import { FaPlus } from "react-icons/fa";
import { getTabs, createTab, updateTab, deleteTab } from '../../service/service';
import { generateUniqueID } from '../../utils/utils';

// Define a functional component
const Grid = () => {
    const [tabs, setTabs] = useState([]); // Initialize state for tabs
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                const tabData = await getTabs(); // Await the promise
                setTabs(tabData); // Set the resolved data to state
            } catch (err) {
                setError(err); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchTabs(); // Call the fetch function
    }, []); // Empty dependency array means this runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>; // Render loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Render error state
    }



    const handleCreate = () => {
        const newTab = {
            id: generateUniqueID(), // Generate a new ID (assuming IDs are sequential)
            color: "green",
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
        console.log("handleUpdate");
        setTabs(prevTabs => 
            prevTabs.map(tab => 
                tab.id === id ? { ...tab, ...updated } : tab
            )
        );
        updateTab(id, updated); // Call the API to update the tab on the server
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

// Export the component
export default Grid;