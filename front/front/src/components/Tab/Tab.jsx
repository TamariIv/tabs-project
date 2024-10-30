import React from 'react';
import styles from './Tab.module.css';
import { useState } from 'react';
import { colorMapping } from './color';
import { FaTrashAlt } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

// Define a functional component
const Tab = ({ tab, deleteTab, updateTab }) => {

    const { id, color, text } = tab;
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const toggleEditorVisibility = () => {
        setIsEditorOpen(prevState => !prevState);
    };
    const handleColorChange = (newColor) => {
        console.log("handleColorChange");
        updateTab(id, { color: newColor });
        setIsEditorOpen(false);
    }

    return (
        <div className={styles.tab} style={{ backgroundColor: colorMapping[color] || color }}>
            <p>
                {text}
            </p>
            <div className={styles.bottomBar} >
                <FaRegCircle className={styles.icon} onClick={toggleEditorVisibility} />
                {isEditorOpen && (
                    <div className={styles.editor}>
                        {Object.values(colorMapping).map((color, index) => (
                            <div className={styles.colorPick}
                                key={index}
                                style={{ backgroundColor: color, }}
                                onClick={() => handleColorChange(color)}
                            ></div>
                        ))}
                    </div>
                )}
                <FaTrashAlt className={styles.icon} onClick={deleteTab} />
            </div>
        </div>
    );
};

// Export the component
export default Tab;