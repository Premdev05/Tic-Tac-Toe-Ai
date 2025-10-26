import React from 'react'
import {motion, scale} from "framer-motion"

const Square = ({value,onClick}) => {


  return (
    <motion.button className='w-[90px] h-[90px] bg-[#1E293B] font-bold text-4xl flex items-center justify-center'
     onClick ={onClick} whileTap={{scale:0.9}}>
      {value}
    </motion.button>
  )
}

export default Square
