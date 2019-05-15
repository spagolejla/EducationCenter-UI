import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from 'src/app/shared/models/student';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  student: Student;
  studentId: number;


  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.studentId = + params.get('id');

      });

    this.getStudent();
  }

  getStudent(): void {
    this.studentService.getStudentById(this.studentId)
      .subscribe(std => {
        this.student = std;
        console.log(this.student);
      }
      );
  }

 onBackClicked() {
    this.location.back();
  }

}
