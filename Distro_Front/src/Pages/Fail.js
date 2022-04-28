import React from 'react';
import '../Assets/css/tailwind.css'

import '../Assets/css/Shared.css'
class CFail extends React.Component{
    
    render()
    {
    return <div className='w-full H-100Vmin Bg-Gradiant-Blue flex justify-center items-center Text-white'> <div className='justify-center items-center  h-14 Bg-White-Trans-30 flex flex-row bg-white  rounded text-white  justify-between px-4'>{this.props.Text}</div></div>
    }
}
export {CFail}