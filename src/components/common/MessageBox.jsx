
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";


import { AnimatePresence, motion } from 'framer-motion';


function MessageBox(props) {
    return (

        <AnimatePresence>

            <motion.div exit={{ opacity: 0, x: -800, }} initial={{ opacity: 0, x: 800, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
            className={`z-20 fixed bottom-10 flex w-full justify-end `}>
                {
                    props.color === 'bg-green-500'
                        ?
                        <div className={` bg-green-500 rounded-lg flex items-center mr-20 text-sm  py-1 px-7 text-white shadow-xl`}>
                            <IoMdCheckmarkCircleOutline className={'text-2xl mr-3 text-green-700 '} /> {props.message}
                        </div>
                        :
                        <div className={` bg-red-500 rounded-lg flex items-center mr-20 text-sm py-1 px-7 text-white shadow-xl`}>
                            <AiOutlineExclamationCircle className={'text-2xl mr-3 text-red-700'} /> {props.message}
                        </div>
                }
            </motion.div>
        </AnimatePresence>

    )
}

export default MessageBox