import React from 'react';
import '../Assets/css/tailwind.css'
import '../Assets/css/Home.css'
import '../Assets/css/Shared.css'
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
        return <div className='Logo bg-cover bg-no-repeat  w-96 h-56 '></div>
    }
    CenteredDiv()
    {
        
        return (
             <div className='flex flex-row h-96'>
               
            
            </div>
        )
        
    }
  
    render()
    {
        return <div  id='Home' className='w-full z-10  md:py-44 py-24  h-fit Bg-Gradiant-Blue'>
            <div className='flex flex-col items-center md:flex-row'>
           <div className='md:w-1/2 flex justify-center items-center'>
            <this.Logo/>
            </div>
            <div className='md:w-1/2 flex-col justify-center items-center'>
            {this.Text()}

            </div>
              
               
            </div>
        </div>
    }
}
export default CHome