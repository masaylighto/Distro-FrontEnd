import React from 'react';
import '../Assets/css/tailwind.css'
import '../Assets/css/Navbar.css'
import {CTransparentButton} from '../Components/Buttons'
import {FormatLink,Links} from '../Helpers/ApiEndPoints'
import {QuitIfInVaild, QuitReact} from '../Helpers/HelperFunctions'
class CNavbar extends React.Component{
    JumpToPage(Link){
     window.location.href=Link
    }
    state={
        Buttons:""
    }
    componentDidMount(){
        this.GetNavbarLinks()
    }
    GetNavbarLinks()
    {      
         fetch(FormatLink(Links.Get,this.props.Language))
         .then(result=>result.json())         
        .then(result=>QuitIfInVaild(result))
        .then(result =>this.CreateButtons(result))
        .catch(()=>QuitReact("Failed to retrieve Data from the server"))
    }
   
    CreateButtons(Data)
    {
        let Buttons = Data.map((element,index)=>{
           return this.CreateButton(element[0],element[1],index)
        })   
       this.setState({Buttons}); 
    }
    CreateButton(Text,Link,Index)
    {
        return <CTransparentButton key={Index} onClick={(()=>this.JumpToPage(Link)).bind()} Text={Text}/>
    }
    render()
    {
       return (<div className='w-full Bg-Gradiant-Blue flex justify-center'>
       <div className="w-5/6  Bg-White-Trans-30 flex md:flex-row flex-col bg-white  rounded-2xl mt-4 mx-auto justify-between px-4">{
           this.state.Buttons
       }</div>
       </div>
       )
    }
}
export default CNavbar