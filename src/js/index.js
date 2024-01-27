require("@babel/polyfill");
import Search from "./model/Search";
import {elements, renderLoader,clearLoader} from './view/base';
import * as searchView from './view/searchView';
import Recipe from "./model/Recipe";
import {renderRecipe, clearRecipe, highlightSelectedRecipe} from './view/recipeView';
const state = {}

const controlSearch = async () => {
    const query = searchView.getInput();

    if(query){
        state.search = new Search(query);
        
        searchView.clearSearchQuery();
        searchView.clearSearchResult();

        renderLoader(elements.searchResultDiv)
        await state.search.doSearch();

        clearLoader();
        if (state.search.result === undefined){
            alert('Хайлт илэрцгүй');
        }
        else{searchView.renderRecipes(state.search. result, 1, 10);
        }
    }
}
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
      const gotoPageNumber = parseInt(btn.dataset.goto, 10);
      searchView.clearSearchResult();
      searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
  });
  
  const r = new Recipe(47746); 
  r.getRecipe();

  //Joriin controller
const controlRecipe = async () => {
    //Urlaas ID salgaj awna
    const id = window.location.hash.replace("#", '');
    //joriin model uusgej ogno
    state.recipe = new Recipe(id);
    //UI delgetsiig beltgene
    clearRecipe();
    renderLoader(elements.recipeDev);
    highlightSelectedRecipe(id);
    
    //Joroo tataj awchirna
    await state.recipe.getRecipe();
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    //Joroo delgetsend gargah
    renderRecipe(state.recipe);
} 
window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);