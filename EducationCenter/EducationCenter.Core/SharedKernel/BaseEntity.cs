using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace EducationCenter.Core.SharedKernel
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
