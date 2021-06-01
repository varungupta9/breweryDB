
const input = document.getElementById('searchArea')
const search = document.getElementById('serachButton')
const list = document.getElementById('match')
const container = document.getElementById('container')
const listed = document.getElementsByClassName('list-group')[0]

search.addEventListener('click', ()=>searcRes(input.value))

async function searcRes(keys){ //asyc method to fetch data from api
     try {      
         document.getElementById('cards').innerHTML=""   
        var url = "https://api.openbrewerydb.org/breweries/search"
         var res = await fetch(url +"?query=" + keys)
          results = await res.json()
         console.log(results)
         if(results.length===0 && keys!=null){ //If serach bar is empty 
            document.getElementById('container').innerHTML="<h1>Oops !! ...No Results Found.<h1>"
            setInterval(() => { location.reload()}, 2000);
         }
        for( let i =0 ; i < results.length ; i++)
         {   
             let title = results[i].name

             let city =  results[i].city
             let state =  results[i].state
             let type = "Type: " + results[i].brewery_type
             let website = results[i].website_url
       
        
          if(title!=null) {createCard(title,city,state,type,website)}
         }

       
     } catch (err) {
         console.log(err)
     }
 }
// to create dynamic cards
 function createCard (titleValue,cityValue,stateValue,genreValue,website){
 var div =  document.createElement('div')
 div.setAttribute('class','card')
 div.setAttribute('id',"card")
 var divBody =  document.createElement('div')
 divBody.setAttribute('class','card-body')
 var heading = document.createElement('h5')
 heading.setAttribute('class','card-title')
 heading.innerHTML=titleValue
 var sub = document.createElement('h6')
 sub.setAttribute('class','card-subtitle mb-2 text-muted')
 sub.innerHTML=genreValue
 var para = document.createElement('p')
 para.setAttribute('class','card-text')
 para.innerHTML=cityValue+" ,"+stateValue
 var link = document.createElement('a')
 link.setAttribute('href',website)
 link.setAttribute('target',"_blank")
 link.innerHTML="More Info"
divBody.append(heading,sub,para,link)
div.append(divBody)
var cards = document.getElementById('cards')
cards.append(div)
 }

