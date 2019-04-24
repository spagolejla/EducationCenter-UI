using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class Competition: BaseEntity
    {
        public Course Course { get; set; }
        [ForeignKey(nameof(Course))]
        public int CourseId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public bool Active { get; set; }
    }
}
