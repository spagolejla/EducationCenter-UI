using EducationCenter.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EducationCenter.Infrastructure.Data
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccountType>().HasData(new AccountType("Administrator") { Id = 1 },
                                                       new AccountType("Educator") { Id = 2 },
                                                       new AccountType("Student") { Id = 3 });

            modelBuilder.Entity<UserAccount>().HasData(new UserAccount("admin","test",1) { Id = 1 },
                                                      new UserAccount("educator","test",2) { Id = 2 },
                                                      new UserAccount("student","test",3) { Id = 3 });

            modelBuilder.Entity<Administrator>().HasData(new Administrator("Lejla", "Spago", "lejla.spago@edu.fit.ba", "036/555-999", 1) { Id = 1 });
                                                     
        } 
    }
}
