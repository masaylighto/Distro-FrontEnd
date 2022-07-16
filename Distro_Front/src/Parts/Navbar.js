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
    ToggleMenu(Event)
    {
        let Menu = Event.target.parentElement.children[1]
        this.state.IsOpen=!this.state.IsOpen
        this.setState(this.state)
    }
    render()
    {
       return (<div className='w-full Bg-Gradiant-Blue flex md:justify-start justify-center'>
       <div className="w-3/6 flex md:flex-row flex-col items-center   gap-3 px-4">
       <div onClick={(Event)=>this.ToggleMenu(Event)} className='Logo w-8 h-8 bg-no-repeat bg-contain my-auto'></div>
       <div className={'w-full overflow-hidden md:h-fit  flex md:flex-row flex-col items-center   gap-3 px-4 '+(this.state.IsOpen===true?'':'h-0')}>
        {
           this.state.Buttons
        }
        </div>
       </div>
       </div>
       )
    }
}
export default CNavbar