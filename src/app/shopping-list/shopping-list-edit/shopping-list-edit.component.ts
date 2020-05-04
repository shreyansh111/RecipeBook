import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false})shoppingListForm:NgForm
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient

  constructor(private slService:ShoppingService) { }

  ngOnInit(): void {
  this.subscription=  this.slService.startedEditing.subscribe(
    (index:number)=>{
     this.editMode=true;
     this.editedItemIndex=index
     this.editedItem=this.slService.getIngedrident(this.editedItemIndex)
     this.shoppingListForm.setValue({
       name:this.editedItem.name,
       amount: this.editedItem.amount
     })
    }
  )
  }
  onAddItem(form:NgForm){
  const value=form.value
  const newIng =new Ingredient(value.name,value.amount);
  if(this.editMode){
    this.slService.updateIngedriednts(this.editedItemIndex,newIng)
  }
  else{
    this.slService.addIngedrient(newIng);
  }
  this.editMode=false;
this.shoppingListForm.reset()
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onClear(){
    this.shoppingListForm.reset();
    this.editMode=false;
  }
  onDelete()
  {
    this.slService.deleteIngedriend(this.editedItemIndex);
     this.onClear()
  }
}
