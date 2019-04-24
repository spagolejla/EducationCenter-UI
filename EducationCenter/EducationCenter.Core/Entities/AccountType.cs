using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class AccountType: BaseEntity
    {
        [Required]
        [StringLength(50, ErrorMessage = "Type cannot be longer than 50 characters.")]
        public string Type { get; set; }

        public AccountType(string Type)
        {
            this.Type = Type;
        }
    }
}
