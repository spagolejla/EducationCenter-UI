using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class CourseField: BaseEntity
    {
        [StringLength(50, ErrorMessage = "Field cannot be longer than 50 characters.")]
        public string Field { get; set; }
    }
}
