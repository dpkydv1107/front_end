import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  url = 'https://localhost:7271/api/CurrentYear/GetAllCurrentYear';
  // attendanceUrl = 'https://localhost:7271/api/CurrentYear/GetCurrentYearByEmployeeName';

constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  getAttendanceData(employeeName: string) {

    return this.http.get(`https://localhost:7271/api/CurrentYear/GetCurrentYearByEmployeeName?employeeName=${employeeName}`);
  }
  getAttendanceMonth(month: string){
    debugger;
    return this.http.get(`https://localhost:7271/api/CurrentYear/GetCurrentYearByMonth?month=${month}`);
  }     
}