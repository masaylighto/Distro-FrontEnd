import React, { useRef } from 'react';
import '../Assets/css/tailwind.css'
import '../Assets/css/Projects.css'
import '../Assets/css/Shared.css'

import {FormatLink,Distro,Translation} from '../Helpers/ApiEndPoints'
import {QuitIfInVaild} from '../Helpers/HelperFunctions'
let Colors=["#038ED5","#00ADDF","#00C9CF","#14DFAD","#9CF087"]

class CDownload extends React.Component{
 
    KeepIndexInRange(Index){
         //this to keep the index that used to determine the color in the Color Array Range 
         //through subtracting the lenghth from the index continuously if the index was larger than the range
        let ColorIndex=Index
        while(ColorIndex>Colors.length-1){
            
            ColorIndex-=Colors.length-1;
        }
        return ColorIndex
    }
    MoveUpEffect(Element){  
     
        Element.animate(
			[
				{ bottom:  Element.clientHeight,},
				{ height: "10px",  },
			],
			{ duration: 100, iterations: 1, direction: "normal", fill: "forwards" })
    }
    componentDidMount(){
        this.GetTranslation()
        this.GetDistro()
        
    }
    GetDistro(){

        fetch(FormatLink(Distro.Get))
        .then(result=>result.json())
        .then(result=>QuitIfInVaild(result))
        .then(result =>this.CreateDistroCards(result))
	 } 
     GetTranslation()
     {
     
         fetch(FormatLink(Translation.Get,"Download",this.props.Language))
         .then(result=>result.json())          
         .then(result=>QuitIfInVaild(result))
         .then(result =>this.SetTranslation(result))
     }
     SetTranslation(Response){
    
        this.state.PartTitle =Response.Title;
        this.state.Download =Response.Download;
		this.setState(this.state)
   
     }
    DistroCard(Distro,Index){
       
        return (<div key={Index}  style={{backgroundColor:Colors[this.KeepIndexInRange(Index)]}} className={'rounded-2xl overflow-hidden relative flex  h-72 shadow flex-col  '}>
           <p   className='text-white z-20  rounded-t-2xl mt-2   text-2xl text-center'>{Distro.name}</p> 
            <p className='text-white justify-center flex items-center text-center absolute top-12 bottom-12 left-0 right-0 px-2 z-10      '>{Distro.Desc}</p>
            <a href={Distro.link} className='h-12 mt-auto hover-Darken active-Darken w-full   text-white justify-center absolute bottom-0 items-center flex text-center mx-auto'>{this.state.Download}</a>
        </div>
        )
    }
    state={
        Cards:"Loading",
        PartTitle:"Chose You Uruk Version",
        Download:"Download"
    }

    CreateDistroCards(projects){
        
        this.state.Cards=  projects.map((project,index)=>{
           
            return this.DistroCard(project,index)
        })  
        this.setState(this.state)
    }
    
    DistroGrid(){
        return (<div  className={'grid gap-4 h-fit justify-center grid-auto-cols   Grid-W-300 '}>
            {this.state.Cards}
            
        </div>)
    }
    PartTitle()
    {
        return <p className=' text-center w-full h-12 mt-3   text-white text-2xl flex justify-center items-center'> {this.state.PartTitle}</p>
    }
    render()
    {
        return (<div id='Projects' className='w-full Bg-Gradiant-Blue mt-32 h-fit pb-10 gap-28 flex  flex-col'>
        {this.PartTitle()}
        {this.DistroGrid()}
        
         </div>)
    }

}
export default CDownload