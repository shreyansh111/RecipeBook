import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
isAuthenticated=false
  private userSub:Subscription;
  constructor(
    private dataStorage:DataStorageService,
    private AuthService:AuthService) { }

  ngOnInit(){
    this.userSub= this.AuthService.user.subscribe(user =>{
    this.isAuthenticated=!!user;
    })
  }
  onSaveData()
  {
      this.dataStorage.storeRecipe();
 
   }
   fetchData()
   {
     this.dataStorage.onfetchData().subscribe();
   }
   OnLogout()
   {
     this.AuthService.logout();
   }
   ngOnDestroy()
   {
     this.userSub.unsubscribe()
   }
}
