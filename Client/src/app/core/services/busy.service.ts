import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  loadung = false;
  busyRequestCount = 0;

  busy(){
    this.busyRequestCount++;
    this.loadung = true;
  }

  idle(){
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.loadung = false;      
    }
  }
}
