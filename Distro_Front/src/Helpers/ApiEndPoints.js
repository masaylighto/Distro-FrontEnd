

const Translation = {
    Get:"translations/Get?page_name={0}&language={1}",  
    GetLanguages:"translations/GetLanguages"
}
const Features = {
    Get:"features/Get?language={0}"
}
const Links={
    Get:"links/Get?language={0}"
}
const Distro={
    Get:"distro/Get?language={0}"
}


const FormatLink = function (Link,...Paramters)
{   

    let newLink=process.env.REACT_APP_SERVER+Link  
    let index=0;   
    for (const paramter of Paramters) {
        newLink=newLink.replace(`{${index}}`,paramter)
        index++
    }  

    return newLink;

}
export {Distro,Translation,Features,Links,FormatLink}