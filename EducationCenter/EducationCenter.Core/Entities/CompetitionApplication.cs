using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class CompetitionApplication: BaseEntity
    {
        public Student Student { get; set; }
        [ForeignKey(nameof(Student))]
        public int StudentId { get; set; }

        public Competition Competition { get; set; }
        [ForeignKey(nameof(Competition))]
        public int CompetitionId { get; set; }
        

        public DateTime Date { get; set; }

    }
}
