let input=document.getElementById('search-input');
let button=document.getElementById('search-btn');
let main=document.getElementById('meal');
button.addEventListener('click',getMeal);


function getMeal(){
let text=input.value.trim();
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`).then(
    e => e.json()
).then(
    data => {
       
        let html="";
        if(!data.meals){
            html=`<h1 class="notfound">SORRY,we didn't found any meal</h1>`;
        }else{
            for(let i=0;i<data.meals.length;i++){
                html+=`
                <div class="meal-item" data-mealId="${data.meals[i].idMeal}">
                        <div class="meal-img">
                            <img src="${data.meals[i].strMealThumb}">
                        </div>
                        <div class="meal-name">
                            <h3>${data.meals[i].strMeal}</h3>
                            <button class="recipe-btn" onclick="getRecipe(${data.meals[i].idMeal})">Get Recipe</button>
                        </div>
    
                    </div>`
            }
        }
        
        main.innerHTML=html;
    }
)
}
document.getElementById("close-btn").addEventListener('click',() =>document.querySelector(".meal-details").style.display="none" )

function getRecipe(id){
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(
        e => e.json()
    ).then(
        data => {
            let meal=data.meals[0];
            let html=`
            <h2 class="title">${meal.strMeal}</h2>
            <p class="category">${meal.strCategory}</p>
            <div class="intruct"> 
                <h3>instuctions</h3>
                <p>${meal.strInstructions}</p>
            </div>
        `;
        document.querySelector('.content').innerHTML=html;
        document.querySelector(".meal-details").style.display="block";
        }
    );
        
    

}




