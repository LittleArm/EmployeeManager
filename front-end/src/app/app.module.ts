import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { EmployeeService } from "./employee.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule
    ],
    providers: [
        EmployeeService,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
