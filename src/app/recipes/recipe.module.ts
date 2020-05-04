import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecipeResolverService } from './recipes-resolver.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeEditComponent,
        RecipeStartComponent
    ],
    imports:[RouterModule.forChild([
        {path:'', component:RecipesComponent,canActivate:[AuthGuard],children:[
            {path:'',component:RecipeStartComponent},
            {path:'new', component:RecipeEditComponent },
            {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
            {path:':id/edit', component:RecipeEditComponent,resolve:[RecipeResolverService] },
        ]},
    ]),SharedModule,FormsModule,ReactiveFormsModule],
    exports:[
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeEditComponent,
        RecipeStartComponent
    ]
})
export class RecipeModule{

}