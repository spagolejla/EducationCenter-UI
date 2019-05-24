import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { Student } from "src/app/shared/models/student";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Course } from "src/app/shared/models/course";
import { CourseService } from "src/app/course/services/course.service";
import { forkJoin } from 'rxjs';

@Component({
  selector: "app-student-details",
  templateUrl: "./student-details.component.html",
  styleUrls: ["./student-details.component.scss"]
})
export class StudentDetailsComponent implements OnInit {
  student: Student;
  studentId: number;
  courses: Course[];

  observables: any = [];

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.studentId = +params.get("id");
    });

    this.observables.push(this.studentService.getStudentById(this.studentId));
    this.observables.push(
      this.courseService.getCoursesByEducatorId(this.studentId)
    );

    forkJoin(this.observables).subscribe(responseList => {
      this.student = responseList[0] as Student;
      this.courses = responseList[1] as Course[];
      console.log(this.courses);
    });
  }




}
