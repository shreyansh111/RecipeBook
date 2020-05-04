import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingService } from './shopping-list/shopping-list.service';
import { AppRouting } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    ShoppingListModule,
    SharedModule,
    AuthModule
   
  ],
  providers: [ShoppingService,RecipeService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
