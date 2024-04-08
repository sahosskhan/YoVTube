const HandleCategory = async() => {
const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
const data = await response.json();
const TabData = data.data;
const TabContainer = document.getElementById('tab-container');
TabData.forEach((Category) => {

        const btn = document.createElement('button');
        btn.innerHTML = `<button onclick="loadPostById(${Category?.category_id})" class="btn btn-ghost bg-[#25252533] text-black focus:bg-[#FF1F3D] focus-within:text-white ">${Category?.category}</button>`;
        TabContainer.appendChild(btn)
    })
};
const loadPostById =async(id) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const allData = data.data;
    const SortButton = document.getElementById('sortByView');
    const dataSorting =() => {
        const SortData = allData.sort((min,max) => {
            min = min?.others?.views;
            min = parseFloat(min);
            max= max?.others?.views;
            max = parseFloat(max);
            return max - min;
           
        })
       refreshCard(SortData); 
     }
     SortButton.addEventListener('click', dataSorting);

     const ShortButtonTwo = document.getElementById('sortByView');
     const DataShoringTwo =() => {
         const SortDataTwo= allData.sort((min,max) => {
             min = min?.others?.views;
             min = parseFloat(min);
             max= max?.others?.views;
             max = parseFloat(max);
             return max - min;
            
         })
        refreshCard(SortDataTwo); 
      }
      ShortButtonTwo.addEventListener('click', DataShoringTwo);

    const refreshCard = (BeforeSort)=>{
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = ""

   const noContent = document.getElementById('no-Content');
   if (BeforeSort.length === 0) {
       noContent.innerHTML = `
       <div class=" flex flex-col justify-center  items-center">
           <img class="w-64" src="image/icon.png" alt="NoVideo" />
          
           <h2 class="text-center font-bold text-3xl mt-4">Oops!! Sorry, There is no <br> content here</h2>
           </div>

       `;
   }
else{
       noContent.innerHTML = ""
   }

   BeforeSort.forEach(video => {
            const Sec = video?.others?.posted_date; //16278
            const Hrs = parseInt(Sec / 3600);
            const Min = parseInt((Sec % 3600) / 60); 
            const VideoTime = `${Hrs} hrs ${Min} mn ago`;
            const cardContainer = document.getElementById('card-container');
            const VideoCard = document.createElement('div'); 
            VideoCard.innerHTML=`
            <main class="card bg-transparent rounded-xl ">
            <section  class="relative h-52">
        <img class="w-full h-full rounded-xl hover:rounded-sm  transition-all duration-300" src="${video.thumbnail}" />
        <div> ${ Sec? `
            <div  class="absolute bottom-0 right-0
             p-2  text-white rounded-lg bg-black  text-sm font-medium">${VideoTime}</div> ` : '' }
             </div>
            </section>
    
    <section class="p-1 mt-4">
    
    <div class="flex justify-start items-start gap-3">
    
        <div  class="avatar">
            <div class="w-10 rounded-full">
        <img src="${video?.authors[0]?.profile_picture}" />
            </div>
        </div>
    
    
    
        <div>
            <h2 class="font-semibold text-xl text-black ">${video?.title}</h2>
          <div class=" flex items-center flex-row ">
            <h2 class="font-medium text-base text-gray-600 ">${video?.authors[0]?.profile_name}</h2>
           <p> ${video?.authors[0]?.verified===true?' <img class="h-6 mt-[2px] -ml-1" src="image/v.png" alt=""> ' : ''}</p>
          </div>
            <h2 class="font-medium text-base text-gray-600">${video?.others.views} views</h2>
        </div>
    
    </div>
    
    
    
    </section>
    
        </main>
            `
            cardContainer.appendChild(VideoCard);
        })
    }
    refreshCard(allData);



}


loadPostById('1000')

HandleCategory()
