import React, { createContext, useContext, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectionChange = (items) => {
        setSelectedItems(items);
    }

    return (
        <EmployeeContext.Provider value={{ selectedItems, handleSelectionChange, setSelectedItems }}>
            {children}
        </EmployeeContext.Provider>
    )
}

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useSelection must be used within a EmployeedProvider');
    }

    return context;
}