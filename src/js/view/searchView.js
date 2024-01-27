import {elements} from './base'
//results__link--active
const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link" href="${recipe.id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
//ul ruugee nemne
   elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

//Хайлтан дээр бичсэн утгыг арилгана
export const clearSearchQuery = () =>{
    elements.searchInput.value = '';
}
//Хайсаны дараах зүүн листүүдийг арилгана. 
export const clearSearchList = () =>{
    elements.searchResultList.innerHTML = ''; 
}
//Хайлтын дээр бичсэн утгыг авч буй хэсэг.
export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => {
    recipes.forEach(el => renderRecipe(el));
}
