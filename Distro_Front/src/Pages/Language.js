import React from 'react';
import '../Assets/css/tailwind.css'
import '../Assets/css/Home.css'
import '../Assets/css/Shared.css'
import {FormatLink,Translation} from '../Helpers/ApiEndPoints'
import {QuitIfInVaild, QuitReact} from '../Helpers/HelperFunctions'
import CMain from './Main';
import ReactDOM from 'react-dom';
let Colors=["#038ED5","#00ADDF","#00C9CF","#14DFAD","#9CF087"]
function RenderTheSite(Language)
{   
  

    ReactDOM.render
    (
      <CMain Language={Language}/>,
      document.getElementById('root')
    );
}

class CLanguage extends React.Component {
    componentDidMount()
    {
        //getting language from the server to show them as card for user to chose
        this.GetLanguages()
    }
    KeepIndexInRange(Index){
        //this to keep the index that used to determine the color in the Color Array Range 
        //through subtracting the lenghth from the index continuously if the index was larger than the range
       let ColorIndex=Index
       while(ColorIndex>Colors.length-1){
           
           ColorIndex-=Colors.length-1;
       }
       return ColorIndex
   }
     GetLanguages()
    {
          fetch(FormatLink(Translation.GetLanguages))   
          .then(result=>result.json())    
          .then(result=>QuitIfInVaild(result))
          .then(result =>this.CreateLanguageCard(result))
          .catch(()=>QuitReact("Failed to retrieve Data from the server"))
    }
    /** 
     this function will decide weather to load language card , inform user that fetching process failed  or if there is already selected language in the url       
    */
    CreateLanguageCard(result){ 
        //if the url contain a lanuage and its exist in the langauge list we got from the backend then render the page
        // if url contain a lanuage  then terminate  the excution of this method
        if(this.LanguageIsSelected(decodeURI(window.location.pathname),result))
        {
            return;
        }
        this.setState({Elements:this.Languages(result)})     
    }
    /**      
      @param {String} Path from window.location.pathname
      @param {"Dict[String language,String]"} Langauges 
      @returns bool
      this method will Check if there is a selected language in the url and if its exist in the list retrived from the backend
     */
    LanguageIsSelected(Path,Langauges)
    {
     //looping through all the element in the Langauges list   
        for (const Langauge of Langauges) {
           //check if the path contain the language 
           // the path moslty will be somthing like this
           //   /language/****
           //so we Check if this path contain languge if it is then we render the site return true
           // we use Langauge.language cause Langauge is a json array element which is something like this language:value
           // so we access it through Langauge.language
            if(Path.includes(Langauge.language))
            {
                RenderTheSite(Langauge.language)
                return true;
            }
        }
        return false
    }
    state={
        Elements:""
    }
    Languages(Data)
    {
        // mapping all the language into cards
        return Data.map((Langauge,index)=>
        {   // we use Langauge.language cause Langauge is a json array element which is something like this language:value
            // so we access it through Langauge.language        
           return this.Card(Langauge.language,index)
        })       
    }
    Card(Langauge,Index)
    {   
        //create a card and bind the SelectLanguage 
        return <div  style={{backgroundColor:Colors[this.KeepIndexInRange(Index)]}} onClick={(()=>{this.SelectLanguage(Langauge)}).bind()} className="text-3xl shadow text-white  h-28 rounded-lg   hover:-mt-3 flex justify-center items-center"><p className="Special-text-color">{Langauge}</p></div>
    }
    SelectLanguage(Langauge){
        //add the language into the url
        window.location.href+=Langauge+"/"
        //render the Main Site
        RenderTheSite(Langauge)
    }  
   
    render() {
        //The Element is in the state variable so we can render the ui depend on the server response
        return <div  className="Bg-Gradiant-Blue w-full H-100Vmin flex justify-center items-center">  
          <div className="grid  rounded-lg w-5/6 justify-between  grid-auto-cols gap-3 ">
         {this.state.Elements}
         </div>
        </div>
    }
}
export default CLanguage