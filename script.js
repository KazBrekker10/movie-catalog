function renderMovieCard({title,thumb,id,sinopsis,year,type}){
 //creando cajas
 const element = document.createElement("LI");
 const movieItem = document.createElement("article");
 const link = document.createElement("a");
 const movieTitle = document.createElement("H3");
 const image = document.createElement("IMG");
 const movieInfo = document.createElement("DIV");
 const infoTitle = document.createElement("H3");
 const infoParagraph = document.createElement("p");
 const yearSpan = document.createElement("span");
 const typeSpan = document.createElement("span");
 //añadiendo clases
 movieItem.classList.add("movie-item");
 movieInfo.classList.add("movie-info");
 yearSpan.classList.add("year");
 typeSpan.classList.add("type");
 //agregando contenido
 infoTitle.textContent = title;
 movieTitle.textContent = `${title} ${year?"("+year+")":""}`;
 infoParagraph.textContent = sinopsis || "No tenemos informacion al respecto";
 link.href = `https://www.filmaffinity.com/es/film${id}.html`
 image.src = `https://pics.filmaffinity.com/${title.toLowerCase().replace(/[^a-zA-Z0-9\s]/g,"").replace(/\s/g,"-")}-${thumb}-mmed.jpg`;
 yearSpan.textContent = year ?? "N/A";
 typeSpan.textContent = type ?? "N/A";
 //anidando cajas
 movieInfo.append(infoTitle,infoParagraph);
 link.append(movieTitle,image,movieInfo,yearSpan,typeSpan);
 movieItem.append(link);
 element.append(movieItem);
 return element;
}

async function setSlider(children){
  const response = await fetch("movies.json");
  let movies = await response.json();
  movies = movies.sort(()=> Math.random() - 0.5 ) 
  Array.from(children).forEach((element,i)=> {
   const {title, sinopsis, poster,year,id} = Array.from(movies).reverse()[i];
   const [posterIMG, titleContent,yearContent ,info,link] = ["img","h3","h4","p","a"].map(tag=> element.querySelector(tag));
   posterIMG.src = `https://pics.filmaffinity.com/${title.toLowerCase().replace(/[^a-zA-Z0-9\s]/g,"").replace(/\s/g,"-")}-${poster}-large.jpg`
   titleContent.textContent = title;
   yearContent.textContent = `(${year})`
   info.textContent = sinopsis;
   link.href = `https://www.filmaffinity.com/es/film${id}.html`;
  })
}
async function renderingMovies(list,num){
response = await fetch("movies.json");
const movies = await response.json()  
console.log(movies)
list.append(...movies.slice(0,num??movies.length).filter(({type})=> type == "movie").map(movie=> renderMovieCard(movie)))
}

function buttonDisplay(buttons){
buttons.forEach(button=> {
 button.addEventListener("click",()=>{
  let slider = document.querySelector("#hero section")
  let sliderPosition = parseFloat(slider.style.right) 
  if (button.classList.contains("left")){
    slider.style.right= sliderPosition>0?`${sliderPosition-100}%`:'400%'
  }
  else if (button.classList.contains("right")){
   slider.style.right = sliderPosition<400 ? `${sliderPosition+100}%`:'0'
  }
})
})}

 setSlider(document.querySelector("#hero section").children);
 renderingMovies(document.querySelector(".movie-list"),20);
 renderingMovies(document.querySelector(".update-list"),5);


/*setInterval(()=>{
 const box = document.querySelector("#hero>section");
 const right = parseFloat(box.style.right )
 box.style.right =right<400 ? `${right+100}%`:0
},5000)*/

buttonDisplay(document.querySelectorAll(".slider-button"))