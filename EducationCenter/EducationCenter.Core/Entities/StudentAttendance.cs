using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class StudentAttendance: BaseEntity
    {
        public StudentCourse StudentCourse { get; set; }
        [ForeignKey(nameof(StudentCourse))]
        public int StudentCourseId { get; set; }

        public CourseClass CourseClass { get; set; }
        [ForeignKey(nameof(CourseClass))]
        public int CourseClassId { get; set; }
       

        public bool Present { get; set; }
    }
}
