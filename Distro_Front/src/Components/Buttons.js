import React from 'react';
import '../Assets/css/tailwind.css'
import '../Assets/css/Shared.css'
class CTransparentButton extends React.Component{
    
    render()
    {
      return (<button  onClick={this.props.onClick} className=" active-Darken p-4 h-14 flex justify-center items-center text-white">{this.props.Text}</button>)
    }
}
export {CTransparentButton}