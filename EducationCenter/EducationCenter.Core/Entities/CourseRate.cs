using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class CourseRate : BaseEntity
    {
        public Course Course { get; set; }
        [ForeignKey(nameof(Course))]
        public int CourseId { get; set; }

        public Student Student { get; set; }
        [ForeignKey(nameof(Student))]
        public int StudentId { get; set; }

        public int Rate { get; set; }

        public string Comment { get; set; }
    }
}
