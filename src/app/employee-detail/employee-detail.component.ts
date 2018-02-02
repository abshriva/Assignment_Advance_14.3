import { Component, OnInit,Input } from '@angular/core';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee-service';

import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../app-error/App-error';

/**
 * 
 * 
 * @export
 * @class EmployeeDetailComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
  
})

export class EmployeeDetailComponent implements OnInit {


  // @Input() empdetail;
  employee:Employee[];
  id: number;
  emp:Employee= new Employee;
  
  private searchData: string;
  
  imageUrl = 'https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg';
  //employeeList: Employee;
  
  
  constructor(private employeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.searchData = '';
    //this.employee = this.employeService.getEmployees();
    this.employeService.getEmployees().subscribe(
      (newemployee:Employee[])=>{
        console.log('Employee returned from the server:',newemployee);
        this.employee=newemployee;
  
      }
    )

    
  }

  onDelete(employeeId) {
    if (confirm('Are you sure?')) {
      this.employeService.deleteEmployee(employeeId).subscribe(
        (emp: Employee) => {
          const index = this.employee.findIndex(
            emp => emp.id === employeeId
          );

          if (index >= 0) {
            this.employee.splice(index, 1);
          }

          console.log('Employee deleted successfully!');
        },
        (error: AppError) => {
          console.log('error:', error);
        }
      );
    }
  }

}
