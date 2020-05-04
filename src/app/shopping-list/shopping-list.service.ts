import {Ingredient} from "../shared/ingredient.model"
import {Subject} from "rxjs"
import { Injectable } from '@angular/core';
export class ShoppingService{
    ingedredientsChanged= new Subject<Ingredient[]>()
    startedEditing= new Subject<number>();
   private ingredients:Ingredient[] =[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',5)
      ];
      getIngredients(){
          return this.ingredients.slice();
      }
      addIngedrient(ingredient:Ingredient)
      {
          this.ingredients.push(ingredient);
          this.ingedredientsChanged.next(this.ingredients.slice());
      }
      addIngedriednts(ingredient:Ingredient[]){
          this.ingredients.push(...ingredient);
          this.ingedredientsChanged.next(this.ingredients.slice());
      }
      getIngedrident(index:number){
          return this.ingredients[index];
      }
      updateIngedriednts(index:number,newIngedredient:Ingredient)
      {
          this.ingredients[index]=newIngedredient;
          this.ingedredientsChanged.next(this.ingredients.slice());
      }
      deleteIngedriend(index:number)
      {
          this.ingredients.splice(index,1);
          this.ingedredientsChanged.next(this.ingredients.slice());
      }
      
}