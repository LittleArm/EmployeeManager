import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  public employees: Employee[] = [];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().pipe(
      tap((response: Employee[]) => {
        this.employees = response;
      }), catchError((error: HttpErrorResponse) => {
        alert(error.message);
        return [];
      })
    ).subscribe();
  }

  public getEmployee(employeeId: number): void {
    this.employeeService.getEmployee(employeeId).pipe(
      tap((response: Employee) => {
        this.editEmployee = response;
      }), catchError((error: HttpErrorResponse) => {
        alert(error.message);
        return [];
      })
    ).subscribe();
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).pipe(
      tap(() => {
        this.getEmployees();
        addForm.reset();
      }), catchError((error: HttpErrorResponse) => {
        alert(error.message);
        return [];
      })
    ).subscribe();
  }

  public onUpdateEmployee(employee: Employee): void {    
    this.employeeService.updateEmployee(employee).pipe(
      tap(() => {
        this.getEmployees();
      }), catchError((error: HttpErrorResponse) => {
        alert(error.message);
        return [];
      })
    ).subscribe();
  }

  public onDeleteEmployee(employeeId: number | undefined): void {
    if (employeeId) {
      this.employeeService.deleteEmployee(employeeId).pipe(
        tap(() => {
          this.getEmployees();
        }), catchError((error: HttpErrorResponse) => {
          alert(error.message);
          return [];
        })
      ).subscribe();
    }
  }

  public onOpenModal(employee: Employee, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
