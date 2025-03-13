
import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import MyTablesComponents from '../home/MyTablesComponents';
import FavoritTables from '../home/FavoritTables';

function MyFolderComponent() {
    
    const show_my_tables = useSelector((state) => state.commonSlice.show_my_tables);

    return (
        <AnimatePresence>
            {show_my_tables && (
                <motion.div
                    className='flex flex-col h-screen border rounded-md bg-black bg-opacity-50 w-screen fixed top-0 z-10'
                    initial={{ opacity: 0 }} // Initial state
                    animate={{ opacity: 1 }} // Animate to this state
                    exit={{ opacity: 0 }} // Animate when component is removed
                    transition={{ duration: 0.1 }} // Animation duration
                >
                    <motion.div
                        className='bg-white w-80 h-full opacity-100'
                        initial={{ x: -300 }} // Start off-screen to the left
                        animate={{ x: 0 }} // Slide in to x: 0
                        exit={{ x: -300 }} // Slide out to the left
                        transition={{ type: 'keyframes', stiffness: 100 }} // Spring animation
                    >
                        <MyTablesComponents />
                        <FavoritTables />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default MyFolderComponent;


