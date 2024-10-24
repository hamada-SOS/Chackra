using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class problemUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompetitiveRooms_AspNetUsers_HostID",
                table: "CompetitiveRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_AspNetUsers_StudentID",
                table: "Submissions");

            migrationBuilder.DropTable(
                name: "ClassroomProblems");

            migrationBuilder.DropTable(
                name: "ClassroomStudents");

            migrationBuilder.DropTable(
                name: "Classrooms");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Problems");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "Problems");

            migrationBuilder.AlterColumn<string>(
                name: "StudentID",
                table: "Submissions",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Result",
                table: "Submissions",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Language",
                table: "Submissions",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Submissions",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Catagory",
                table: "Problems",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "Problems",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "HostID",
                table: "CompetitiveRooms",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_CompetitiveRooms_AspNetUsers_HostID",
                table: "CompetitiveRooms",
                column: "HostID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_AspNetUsers_StudentID",
                table: "Submissions",
                column: "StudentID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompetitiveRooms_AspNetUsers_HostID",
                table: "CompetitiveRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_AspNetUsers_StudentID",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Catagory",
                table: "Problems");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "Problems");

            migrationBuilder.UpdateData(
                table: "Submissions",
                keyColumn: "StudentID",
                keyValue: null,
                column: "StudentID",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "StudentID",
                table: "Submissions",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Submissions",
                keyColumn: "Result",
                keyValue: null,
                column: "Result",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Result",
                table: "Submissions",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Submissions",
                keyColumn: "Language",
                keyValue: null,
                column: "Language",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Language",
                table: "Submissions",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Submissions",
                keyColumn: "Code",
                keyValue: null,
                column: "Code",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Submissions",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Problems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "Problems",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "CompetitiveRooms",
                keyColumn: "HostID",
                keyValue: null,
                column: "HostID",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "HostID",
                table: "CompetitiveRooms",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Classrooms",
                columns: table => new
                {
                    ClassroomID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MentorID = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ApplicationUserId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClassCode = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClassroomName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreationDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classrooms", x => x.ClassroomID);
                    table.ForeignKey(
                        name: "FK_Classrooms_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Classrooms_AspNetUsers_MentorID",
                        column: x => x.MentorID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ClassroomProblems",
                columns: table => new
                {
                    ClassroomID = table.Column<int>(type: "int", nullable: false),
                    ProblemID = table.Column<int>(type: "int", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AssignedDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassroomProblems", x => new { x.ClassroomID, x.ProblemID });
                    table.ForeignKey(
                        name: "FK_ClassroomProblems_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ClassroomProblems_Classrooms_ClassroomID",
                        column: x => x.ClassroomID,
                        principalTable: "Classrooms",
                        principalColumn: "ClassroomID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassroomProblems_Problems_ProblemID",
                        column: x => x.ProblemID,
                        principalTable: "Problems",
                        principalColumn: "ProblemID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ClassroomStudents",
                columns: table => new
                {
                    ClassroomID = table.Column<int>(type: "int", nullable: false),
                    StudentID = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassroomStudents", x => new { x.ClassroomID, x.StudentID });
                    table.ForeignKey(
                        name: "FK_ClassroomStudents_AspNetUsers_StudentID",
                        column: x => x.StudentID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClassroomStudents_Classrooms_ClassroomID",
                        column: x => x.ClassroomID,
                        principalTable: "Classrooms",
                        principalColumn: "ClassroomID",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ClassroomProblems_ApplicationUserId",
                table: "ClassroomProblems",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassroomProblems_ProblemID",
                table: "ClassroomProblems",
                column: "ProblemID");

            migrationBuilder.CreateIndex(
                name: "IX_Classrooms_ApplicationUserId",
                table: "Classrooms",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Classrooms_MentorID",
                table: "Classrooms",
                column: "MentorID");

            migrationBuilder.CreateIndex(
                name: "IX_ClassroomStudents_StudentID",
                table: "ClassroomStudents",
                column: "StudentID");

            migrationBuilder.AddForeignKey(
                name: "FK_CompetitiveRooms_AspNetUsers_HostID",
                table: "CompetitiveRooms",
                column: "HostID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_AspNetUsers_StudentID",
                table: "Submissions",
                column: "StudentID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
