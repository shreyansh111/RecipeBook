import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage';
import { RecipeService } from './recipe.service';

@Injectable(
    {providedIn:'root'}
)
export class RecipeResolverService implements Resolve<Recipe[]>
{
        constructor(private dataStorage:DataStorageService,private recipeService:RecipeService){}
        resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)
        {
            const recipe=this.recipeService.getRecipe();
            if(recipe.length===0)
            {
                return this.dataStorage.onfetchData();
            }
            else{
                return recipe;
            }
            
        }
}