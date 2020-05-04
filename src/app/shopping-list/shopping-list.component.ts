import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model'
import { ShoppingService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
ingredients:Ingredient[] =[];
private idChabge:Subscription;
  constructor(private slService:ShoppingService) { }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients();
     this.idChabge= this.slService.ingedredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    )
  }
 ngOnDestroy(){
   this.idChabge.unsubscribe;
 }
 onEditItem(index:number){
    this.slService.startedEditing.next(index)      
}

}
