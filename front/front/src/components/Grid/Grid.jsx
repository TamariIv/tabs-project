import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Grid.module.css';
import Tab from '../Tab/Tab';
import { FaPlus } from "react-icons/fa";
import { getTabs, createTab, updateTab, deleteTab } from '../../service/service';

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
    const addTab = () => {
        const newTab = {
            id: tabs.length + 1, // Generate a new ID (assuming IDs are sequential)
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

    const handleUpdate = (id, updatedColor) => {
        console.log("updateTabColor");
        setTabs(prevTabs => 
            prevTabs.map(tab => 
                tab.id === id ? { ...tab, color: updatedColor.color } : tab
            )
        );
        updateTab(id, updatedColor); // Call the API to update the tab on the server
    };

    return (
        <div className={styles.grid}>
            {tabs.map(tab => (
                <Tab 
                key={tab.id} 
                tab={tab} 
                deleteTab={() => handleDelete(tab.id)}
                updateTab={() => handleUpdate} />
            ))}

            <div className={styles.addTab}>
                <FaPlus className={styles.plus} onClick={addTab} />
            </div>
        </div>
    );
};

// Export the component
export default Grid;