using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class Notification : BaseEntity
    {
        [Required]
        [StringLength(50, ErrorMessage = "Title cannot be longer than 50 characters.")]
        public string Title { get; set; }

        [Required]
        public string Text { get; set; }

        public DateTime Date { get; set; }

        public Educator Educator { get; set; }
        [ForeignKey(nameof(Educator))]
        public int? EducatorId { get; set; }

        public Administrator Administrator { get; set; }
        [ForeignKey(nameof(Administrator))]
        public int? AdministratorId { get; set; }
       
    }
}
