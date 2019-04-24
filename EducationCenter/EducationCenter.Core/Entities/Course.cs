using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class Course: BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int NumberOfLectures { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ClassStartTime { get; set; }


        public string[] DaysOfWeek { get; set; }

        public Administrator Administrator { get; set; }
        [ForeignKey(nameof(Administrator))]
        public int AdministratorId { get; set; }

        public Educator Educator { get; set; }
        [ForeignKey(nameof(Educator))]
        public int EducatorId { get; set; }

        public CourseField CourseField { get; set; }
        [ForeignKey(nameof(CourseField))]
        public int CourseFieldId { get; set; }
        

        public double Price { get; set; }
    }
}
