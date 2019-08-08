import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  hiddenNotif: boolean = true;
 

  constructor() { }

  ngOnInit() {
  }

hiddeNotif(){
   this.hiddenNotif = true;
}

showNotif(){
   this.hiddenNotif = false;
}
}
