using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EducationCenter.Infrastructure.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccountTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseFields",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Field = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseFields", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(maxLength: 50, nullable: true),
                    Password = table.Column<string>(maxLength: 50, nullable: true),
                    AccountTypeId = table.Column<int>(nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAccounts_AccountTypes_AccountTypeId",
                        column: x => x.AccountTypeId,
                        principalTable: "AccountTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Administrators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    Email = table.Column<string>(maxLength: 100, nullable: false),
                    Phone = table.Column<string>(maxLength: 100, nullable: false),
                    UserAccountId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Administrators_UserAccounts_UserAccountId",
                        column: x => x.UserAccountId,
                        principalTable: "UserAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Educators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    Phone = table.Column<string>(maxLength: 50, nullable: false),
                    UserAccountId = table.Column<int>(nullable: false),
                    Title = table.Column<string>(maxLength: 50, nullable: false),
                    CourseFieldId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Educators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Educators_CourseFields_CourseFieldId",
                        column: x => x.CourseFieldId,
                        principalTable: "CourseFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Educators_UserAccounts_UserAccountId",
                        column: x => x.UserAccountId,
                        principalTable: "UserAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    Phone = table.Column<string>(maxLength: 50, nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    UserAccountId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_UserAccounts_UserAccountId",
                        column: x => x.UserAccountId,
                        principalTable: "UserAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    NumberOfLectures = table.Column<int>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    ClassStartTime = table.Column<DateTime>(nullable: false),
                    DaysOfWeek = table.Column<string>(nullable: true),
                    AdministratorId = table.Column<int>(nullable: false),
                    EducatorId = table.Column<int>(nullable: false),
                    CourseFieldId = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Courses_Administrators_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "Administrators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Courses_CourseFields_CourseFieldId",
                        column: x => x.CourseFieldId,
                        principalTable: "CourseFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Courses_Educators_EducatorId",
                        column: x => x.EducatorId,
                        principalTable: "Educators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(maxLength: 50, nullable: false),
                    Text = table.Column<string>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    EducatorId = table.Column<int>(nullable: true),
                    AdministratorId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Administrators_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "Administrators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Notifications_Educators_EducatorId",
                        column: x => x.EducatorId,
                        principalTable: "Educators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EducatorRates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EducatorId = table.Column<int>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    Rate = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducatorRates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EducatorRates_Educators_EducatorId",
                        column: x => x.EducatorId,
                        principalTable: "Educators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EducatorRates_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Competitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<int>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Active = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Competitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Competitions_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseClasses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseClasses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseClasses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseRates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<int>(nullable: false),
                    StudentId = table.Column<int>(nullable: false),
                    Rate = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseRates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseRates_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseRates_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StudentId = table.Column<int>(nullable: false),
                    CourseId = table.Column<int>(nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Payments_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StudentCourses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StudentId = table.Column<int>(nullable: false),
                    CourseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentCourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentCourses_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentCourses_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CompetitionApplications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StudentId = table.Column<int>(nullable: false),
                    CompetitionId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetitionApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompetitionApplications_Competitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "Competitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompetitionApplications_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StudentAttendances",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StudentCourseId = table.Column<int>(nullable: false),
                    CourseClassId = table.Column<int>(nullable: false),
                    Present = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentAttendances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentAttendances_CourseClasses_CourseClassId",
                        column: x => x.CourseClassId,
                        principalTable: "CourseClasses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentAttendances_StudentCourses_StudentCourseId",
                        column: x => x.StudentCourseId,
                        principalTable: "StudentCourses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "AccountTypes",
                columns: new[] { "Id", "Type" },
                values: new object[] { 1, "Administrator" });

            migrationBuilder.InsertData(
                table: "AccountTypes",
                columns: new[] { "Id", "Type" },
                values: new object[] { 2, "Educator" });

            migrationBuilder.InsertData(
                table: "AccountTypes",
                columns: new[] { "Id", "Type" },
                values: new object[] { 3, "Student" });

            migrationBuilder.InsertData(
                table: "UserAccounts",
                columns: new[] { "Id", "AccountTypeId", "Active", "CreatedDate", "Password", "Username" },
                values: new object[] { 1, 1, true, new DateTime(2019, 4, 23, 13, 6, 46, 696, DateTimeKind.Local).AddTicks(5737), "test", "admin" });

            migrationBuilder.InsertData(
                table: "UserAccounts",
                columns: new[] { "Id", "AccountTypeId", "Active", "CreatedDate", "Password", "Username" },
                values: new object[] { 2, 2, true, new DateTime(2019, 4, 23, 13, 6, 46, 704, DateTimeKind.Local).AddTicks(9866), "test", "educator" });

            migrationBuilder.InsertData(
                table: "UserAccounts",
                columns: new[] { "Id", "AccountTypeId", "Active", "CreatedDate", "Password", "Username" },
                values: new object[] { 3, 3, true, new DateTime(2019, 4, 23, 13, 6, 46, 704, DateTimeKind.Local).AddTicks(9915), "test", "student" });

            migrationBuilder.InsertData(
                table: "Administrators",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "Phone", "UserAccountId" },
                values: new object[] { 1, "lejla.spago@edu.fit.ba", "Lejla", "Spago", "036/555-999", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Administrators_UserAccountId",
                table: "Administrators",
                column: "UserAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionApplications_CompetitionId",
                table: "CompetitionApplications",
                column: "CompetitionId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionApplications_StudentId",
                table: "CompetitionApplications",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Competitions_CourseId",
                table: "Competitions",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseClasses_CourseId",
                table: "CourseClasses",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseRates_CourseId",
                table: "CourseRates",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseRates_StudentId",
                table: "CourseRates",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_AdministratorId",
                table: "Courses",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_CourseFieldId",
                table: "Courses",
                column: "CourseFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_EducatorId",
                table: "Courses",
                column: "EducatorId");

            migrationBuilder.CreateIndex(
                name: "IX_EducatorRates_EducatorId",
                table: "EducatorRates",
                column: "EducatorId");

            migrationBuilder.CreateIndex(
                name: "IX_EducatorRates_StudentId",
                table: "EducatorRates",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Educators_CourseFieldId",
                table: "Educators",
                column: "CourseFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Educators_UserAccountId",
                table: "Educators",
                column: "UserAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_AdministratorId",
                table: "Notifications",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_EducatorId",
                table: "Notifications",
                column: "EducatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_CourseId",
                table: "Payments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_StudentId",
                table: "Payments",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAttendances_CourseClassId",
                table: "StudentAttendances",
                column: "CourseClassId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAttendances_StudentCourseId",
                table: "StudentAttendances",
                column: "StudentCourseId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentCourses_CourseId",
                table: "StudentCourses",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentCourses_StudentId",
                table: "StudentCourses",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_UserAccountId",
                table: "Students",
                column: "UserAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccounts_AccountTypeId",
                table: "UserAccounts",
                column: "AccountTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompetitionApplications");

            migrationBuilder.DropTable(
                name: "CourseRates");

            migrationBuilder.DropTable(
                name: "EducatorRates");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "StudentAttendances");

            migrationBuilder.DropTable(
                name: "Competitions");

            migrationBuilder.DropTable(
                name: "CourseClasses");

            migrationBuilder.DropTable(
                name: "StudentCourses");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Administrators");

            migrationBuilder.DropTable(
                name: "Educators");

            migrationBuilder.DropTable(
                name: "CourseFields");

            migrationBuilder.DropTable(
                name: "UserAccounts");

            migrationBuilder.DropTable(
                name: "AccountTypes");
        }
    }
}
