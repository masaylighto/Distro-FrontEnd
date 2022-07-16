import React from 'react';
import '../Assets/css/tailwind.css'
import '../Assets/css/Components.css'
import '../Assets/css/Shared.css'
import { ReactComponent as SvgWave } from '../Assets/Icons/wave.svg';
function Wave()
{
    return <SvgWave className='h-56 sm:visible invisible w-full Bg-Gradiant-Blue'></SvgWave>
}

export {Wave}