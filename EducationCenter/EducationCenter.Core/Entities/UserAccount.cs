using EducationCenter.Core.SharedKernel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EducationCenter.Core.Entities
{
    public class UserAccount: BaseEntity
    {
        [StringLength(50, ErrorMessage = "Username cannot be longer than 50 characters.")]
        public string Username { get; set; }

        [StringLength(50, ErrorMessage = "Password cannot be longer than 50 characters.")]
        public string Password { get; set; }

        public AccountType AccountType { get; set; }
        [ForeignKey(nameof(AccountType))]
        public int AccountTypeId { get; set; }
       
        public bool Active { get; set; }
        public DateTime CreatedDate { get; set; }

        public UserAccount(string username, string password, int AccountTypeId)
        {
            this.Username = username;
            this.Password = password;
            this.AccountTypeId = AccountTypeId;
            this.Active = true;
            this.CreatedDate = DateTime.Now;
        }
    }
}
