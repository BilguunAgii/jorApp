require("@babel/polyfill");
import Search from "./model/Search";
import {elements, renderLoader,clearLoader} from './view/base';
import * as searchView from './view/searchView';

const state = {}

const controlSearch = async () => {
    const query = searchView.getInput();

    if(query){
        state.search = new Search(query);
        
        searchView.clearSearchQuery();
        searchView.clearSearchList();

        renderLoader(elements.searchResultDiv)
        await state.search.doSearch();

        clearLoader();
        if (state.search.result === undefined){
            alert('Хайлт илэрцгүй');
        }
        else{searchView.renderRecipes(state.search. result);
        }
    }
}
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});