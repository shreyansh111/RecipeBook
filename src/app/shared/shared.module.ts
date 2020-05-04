import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinner } from './loadingSpinner/loading-spiner.component';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinner,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        AlertComponent,
        LoadingSpinner,
        DropdownDirective,
        CommonModule
    ],
    entryComponents:[AlertComponent]
})
export class SharedModule{

}