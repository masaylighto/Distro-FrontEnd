import React from 'react';
import '../Assets/css/tailwind.css'
import '../Assets/css/Home.css'
import '../Assets/css/Shared.css'
import { ReactComponent as LogoSvg } from "../Assets/Icons/dist_logo.svg"
import {FormatLink,Translation} from '../Helpers/ApiEndPoints'
import {QuitIfInVaild, QuitReact} from '../Helpers/HelperFunctions'

class CHome extends React.Component{
    componentDidMount(){
        this.GetTranslation()
    }
   state={
        Title:"",
        Desc:"",
       
    }
    
    GetTranslation()
    {
        fetch(FormatLink(Translation.Get,"Home",this.props.Language))   
        .then(result=>result.json())         
        .then(result=>QuitIfInVaild(result))
        .then(result =>this.SetTranslation(result))
        .catch(()=>QuitReact("Failed to retrieve Data from the server"))
    }
    SetTranslation(Data){      
        this.setState(Data)
    }
    Text()
    {
        return <p className='px-7 text-white md:w-2/3 w-full '>
               {this.state.Desc}
        </p>
    }
    ReadMoreBtn()
    {
        return <a></a>
    }
    Logo()
    {

        return <LogoSvg style={{width: 300}} className='bg-cover bright1_2 bg-no-repeat     h-80'/>
    }

  
    render()
    {
        return <div  id='Home' className='w-full z-10 items-center flex justify-center  py-5  h-fit Bg-Gradiant-Blue'>
                 <div className='flex  justify-center mt-5 items-center flex-col md:w-1/2 '>             
                    <this.Logo />               
                <div className='flex flex-col justify-center items-center'>
                    {this.Text()}               
                </div>
              
               
            </div>
        </div>
    }
}
export default CHome