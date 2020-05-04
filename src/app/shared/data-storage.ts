import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map ,tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn:'root'
})
export  class DataStorageService{
    constructor(
        private http:HttpClient,
        private recipeService:RecipeService,
        private authService:AuthService
        ){}
    storeRecipe()
    {
        const recipe =this.recipeService.getRecipe();
        this.http.put('https://recipebook-6467e.firebaseio.com/recipe.json',
        recipe
        )
        .subscribe(response =>
            {
            console.log(response)
        })
    }
    onfetchData()
    { 
          return this.http.get<Recipe[]>(
            'https://recipebook-6467e.firebaseio.com/recipe.json',
            
          ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                  return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                  };
                });
              }),
              tap(recipes => {
                this.recipeService.setRecipe(recipes);
              })

        )
       
    
    }
  }