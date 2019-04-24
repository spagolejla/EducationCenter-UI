using EducationCenter.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EducationCenter.Infrastructure.Data
{
    public class MyContext: DbContext
    {

        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {

        }
        public DbSet<AccountType> AccountTypes { get; set; }
        public DbSet<UserAccount> UserAccounts { get; set; }

        public DbSet<Student> Students { get; set; }

        public DbSet<CourseField> CourseFields { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseRate> CourseRates { get; set; }
        public DbSet<StudentCourse> StudentCourses { get; set; }
        public DbSet<CourseClass> CourseClasses { get; set; }
        public DbSet<StudentAttendance> StudentAttendances { get; set; }
        public DbSet<Competition> Competitions { get; set; }
        public DbSet<CompetitionApplication> CompetitionApplications { get; set; }

        public DbSet<Educator> Educators { get; set; }
        public DbSet<EducatorRate> EducatorRates { get; set; }

        public DbSet<Administrator> Administrators { get; set; }

        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
            .Property(e => e.DaysOfWeek)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

            modelBuilder.Entity<Course>()
               .HasOne(e => e.Educator)
               .WithMany()
               .HasForeignKey(e => e.EducatorId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CourseRate>()
              .HasOne(s => s.Student)
              .WithMany()
              .HasForeignKey(s => s.StudentId)
              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Payment>()
            .HasOne(s => s.Student)
            .WithMany()
            .HasForeignKey(s => s.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<StudentCourse>()
          .HasOne(s => s.Student)
          .WithMany()
          .HasForeignKey(s => s.StudentId)
          .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CompetitionApplication>()
       .HasOne(s => s.Student)
       .WithMany()
       .HasForeignKey(s => s.StudentId)
       .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EducatorRate>()
     .HasOne(s => s.Student)
     .WithMany()
     .HasForeignKey(s => s.StudentId)
     .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<StudentAttendance>()
     .HasOne(s => s.StudentCourse)
     .WithMany()
     .HasForeignKey(s => s.StudentCourseId)
     .OnDelete(DeleteBehavior.Restrict);

            ModelBuilderExtensions.Seed(modelBuilder);

        }

    }
}
