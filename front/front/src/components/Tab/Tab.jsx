import React from 'react';
import styles from './Tab.module.css';
import { useState } from 'react';
import { colorMapping } from './color';
import { FaTrashAlt } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";


const Tab = ({ tab, deleteTab, updateTab }) => {

    const { id, color, text } = tab;
    const [isColorEditorOpen, setIsColorEditorOpen] = useState(false);
    const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const toggleColorEditorVisibility = () => {
        setIsColorEditorOpen(prevState => !prevState);
    };
    const toggleTextEditorVisibility = () => {
        setIsTextEditorOpen(prevState => !prevState);
    };

    const handleColorChange = (newColor) => {
        updateTab(id, { color: newColor });
        setIsColorEditorOpen(false);
    }

    const handleTextChange = () => {
        updateTab(id, { text: editedText });
        setIsTextEditorOpen(false);
    }

    const handleInputChange = (e) => {
        setEditedText(e.target.value); // Update the edited text as the user types
    };

    const handleBlur = () => {
        handleTextChange(); // Update the text on blur
    };

    return (
        <div className={styles.tab} style={{ backgroundColor: color }}>
            {isTextEditorOpen ? (
                <div className={styles.wrapper}>
                    <input
                        type="text"
                        value={editedText}
                        onChange={handleInputChange}
                        onBlur={handleBlur} // Exit editing mode on blur
                        autoFocus // Focus the input on edit
                    />
                </div>
            ) : (
                <p onClick={toggleTextEditorVisibility}>
                    {text}
                </p>
            )
            }


            <div className={styles.bottomBar} >
                <FaRegCircle className={styles.icon} onClick={toggleColorEditorVisibility} />
                {isColorEditorOpen && (
                    <div className={styles.editor}>
                        {/* render circle for each optional color */}
                        {colorMapping.map((color) => (
                            <div className={styles.colorPick}
                                key={color}
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

export default Tab;