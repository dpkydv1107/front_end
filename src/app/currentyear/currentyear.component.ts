import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../current.service';

@Component({
  selector: 'app-currentyear',
  templateUrl: './currentyear.component.html',
  styleUrls: ['./currentyear.component.scss'],
})
export class CurrentyearComponent  implements OnInit {
  attendanceData: any = [];
selectedMonth='';
selectedEmployee='';
constructor(private service: CurrentService) {}

  ngOnInit() {
    this.service.getUsers().subscribe((data) => {
      this.attendanceData = data; 
    });
  }
}
