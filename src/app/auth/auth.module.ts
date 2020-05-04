import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        AuthComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports:[
        AuthComponent
    ]

    
})
export class AuthModule {

}