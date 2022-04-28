import React from 'react';
import '../Assets/css/tailwind.css'
import '../Assets/css/Contribution.css'
import '../Assets/css/Shared.css'
import {FormatLink,Translation,Features} from '../Helpers/ApiEndPoints'
import {QuitIfInVaild, QuitReact,CopyToClipboard} from '../Helpers/HelperFunctions'
import { Tringle } from '../Components/Varity';

class CFeatures extends React.Component{
    

   componentDidMount(){
       this.GetTranslation()
       this.GetContributers()
       
   }
   GetContributers(){

       fetch(FormatLink(Features.Get,this.props.Language))
       .then(result=>result.json())    
       .then(result=>QuitIfInVaild(result))
       .then(result =>this.CreateCards(result))
       .catch(()=>QuitReact("Failed to retrieve Data from the server"))
    } 
    GetTranslation()
    {
    
        fetch(FormatLink(Translation.Get,"Features",this.props.Language))   
        .then(result=>result.json())         
        .then(result=>QuitIfInVaild(result))
        .then(result =>this.SetTranslation(result))
        .catch(()=>QuitReact("Failed to retrieve Data from the server"))
    }
    SetTranslation(Response){
     
       this.state.PartTitle =Response.Title;
       this.state.Copy =Response.Copy;
       this.setState(this.state)
  
    }

   Card(Future,Index){
      
    
       return (<div key={Index} className={'flex   flex-col  '}>
           <div   className=' text-black Text-Gradiant-Blue  Noto text-xl   mb-3 w-full flex '>
           {Future.name}
           </div>
           <div  className=' bg-white  Noto text-sm w-full flex '>
              {Future.description}
               
           </div>
       </div>
       )
   }
   state={
       Cards:"Loading",
       PartTitle:"Contributers",
       Copy:"Copy"
   }

   CreateCards(Features){
       
       this.state.Cards = Features.map((Feature,index)=>{
        
           return this.Card(Feature,index)
       })  
       this.setState(this.state)
   }
   
   FeatruesGrid(){
       return (<div  className={'grid gap-4 h-fit justify-center grid-auto-cols   Grid-W-350 '}>
           {this.state.Cards}
           
       </div>)
   }
   PartTitle()
   {
       return <p className='w-fit my-20 Text-Gradiant-Blue mx-auto text-3xl'> {this.state.PartTitle}</p>
   }
   render()
   {
       return (<div id='members' className='w-full  bg-white relative  h-fit pb-10  flex  flex-col'>

       {this.PartTitle()}
       {this.FeatruesGrid()}
       
        </div>)
   }
}
export default CFeatures