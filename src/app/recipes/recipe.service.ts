import {Recipe} from './recipe.model'
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{
    
recipesChanged=new Subject<Recipe[]>()
private  recipes:Recipe[] =[
    //  new Recipe('Pasta','It is said to be originated in Itly.There are many type of pasta and they vary with the variation in sauce','https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-and-Spinach-Pasta-skillet-1-500x480.jpg',[
    //      new Ingredient('meat',1),
    //      new Ingredient('cheese',20)
    //  ]),
    //  new Recipe('A test Recipe','this is a very simple test','https://storage.needpix.com/rsynced_images/food-1459693_1280.jpg',[
    //      new Ingredient('Buns',2),
    //      new Ingredient('meat',1)
    //  ])
   ];
   constructor(private slService:ShoppingService){}
   getRecipe(){
       return this.recipes.slice();
   }
   addIngedriendtoshopping(ingredient:Ingredient[]){
      this.slService.addIngedriednts(ingredient);
   }
   getRecipes(id:number){
       return this.recipes[id];
   }
   addRecipe(recipe:Recipe){
       this.recipes.push(recipe);
       this.recipesChanged.next(this.recipes.slice())
   }
   updateRecipe(index:number,recipe:Recipe)
   {
    this.recipes[index]=recipe;
    this.recipesChanged.next(this.recipes.slice())
   }
   deleteRecipe(index:number){
       this.recipes.splice(index,1)
       this.recipesChanged.next(this.recipes.slice())
   }
   setRecipe(recipe:Recipe[])
   {
       this.recipes=recipe;
       this.recipesChanged.next(this.recipes.slice())
   }
}