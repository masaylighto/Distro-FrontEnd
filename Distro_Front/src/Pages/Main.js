import React from 'react';
import CHome from '../Parts/Home';
import CNavbar from '../Parts/Navbar';
import '../Assets/css/tailwind.css'
import '../Assets/css/Shared.css'


import {Wave} from '../Components/Varity'

import CFeatures from '../Parts/Features';
import CDownload from '../Parts/Download';

class CMain extends React.Component{
    render()
    {
    return ( <div dir={this.props.Language==="العربية"?"rtl":"ltr"}  className='flex items-center scrollbar-none w-full flex-col'>
                 <CNavbar Language={this.props.Language}/>
                 <CHome Language={this.props.Language}/>
                 <CFeatures Language={this.props.Language}></CFeatures>  
                 <CDownload Language={this.props.Language}></CDownload>
            </div>
        )
    }
}

export default CMain