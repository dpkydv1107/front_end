// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../current.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showDropdowns: boolean = false;
  selectedOption1: string = '';
  selectedOption2: string = '';
  employeeNames: any;
  showGrid: boolean = false;
  attendanceData: any[] = [];
  monthOptions: any;
  constructor(private service: CurrentService) {}

  ngOnInit() {
    this.service.getUsers().subscribe((data) => {
      this.employeeNames = data;
      this.monthOptions= data;
       this.monthOptions = this.removeDuplicateMonths(data);
      this.employeeNames = this.removeDuplicates(this.employeeNames, 'employee_name');      
    });
    this.service.getAttendanceMonth(this.monthOptions).subscribe((options) => {
      this.monthOptions = options; // Assuming the service returns month options in the correct format
    });
  }
  removeDuplicates(array: any[], property: string): any[] {
    return array.filter((obj, index, self) =>
      index === self.findIndex((o) => o[property] === obj[property])
    );
  }
  toggleDropdowns() {
    this.showDropdowns = !this.showDropdowns;
  }
  fetchGridData() {
    const trimmedEmployeeName = this.selectedOption1.trim();
    if (this.selectedOption1) {
      this.service.getAttendanceData(trimmedEmployeeName).subscribe((data) => {
        this.attendanceData = data as any;
        this.showGrid = true;
      });
    } else {
      this.showGrid = false;
    }
  }
  fetchGridByMonth() {
    debugger;
    if (this.selectedOption2) {
   
      const formattedMonth = this.selectedOption2.trim();
      this.service.getAttendanceMonth(formattedMonth).subscribe(
        (data) => {
          debugger
          console.log('Data received for selected month:', data); // Check the received data
          this.attendanceData = data as any;
          this.showGrid = true;
        },
        (error) => {
          console.error('Error fetching data for selected month:', error); // Log any errors
          this.showGrid = false;
        }
      );
    } else {
      this.showGrid = false;
    }
  }
  removeDuplicateMonths(options: any[]): any[] {
    const uniqueMonths = options.reduce((acc, current) => {
      const existing = acc.find((item: { date: any; }) => {
        // Extracting the month from the 'date' property using the JavaScript Date object
        const currentMonth = new Date(item.date).getMonth();
        const newMonth = new Date(current.date).getMonth();
        return currentMonth === newMonth;
      });
  
      if (!existing) {
        acc.push(current);
      }
      return acc;
    }, []);
  
    return uniqueMonths;
  }
}
