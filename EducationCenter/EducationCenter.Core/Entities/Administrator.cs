using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class Administrator : BaseEntity
    {
        [Required]
        [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Last name cannot be longer than 50 characters.")]
        public string LastName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Email cannot be longer than 50 characters.")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Phone cannot be longer than 50 characters.")]
        public string Phone { get; set; }


        public UserAccount UserAccount { get; set; }
        [ForeignKey(nameof(UserAccount))]
        public int UserAccountId { get; set; }

        public Administrator(string firstName, string lastName, string email, string phone, int userAccountId)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Email = email;
            this.Phone = phone;
            this.UserAccountId = userAccountId;
        }
    }
}
