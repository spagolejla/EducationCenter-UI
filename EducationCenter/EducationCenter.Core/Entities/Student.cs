using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class Student: BaseEntity
    {
        [Required]
        [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Last name cannot be longer than 50 characters.")]
        public string LastName { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Email cannot be longer than 50 characters.")]
        public string Email { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Phone cannot be longer than 50 characters.")]
        public string Phone { get; set; }


        public DateTime BirthDate { get; set; }

        public UserAccount UserAccount { get; set; }
        [ForeignKey(nameof(UserAccount))]
        public int UserAccountId { get; set; }

        public string Description { get; set; }

        
        


    }
}
