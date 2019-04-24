using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class CourseClass : BaseEntity
    {
        public Course Course { get; set; }
        [ForeignKey(nameof(Course))]
        public int CourseId { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }
    }
}
