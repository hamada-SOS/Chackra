using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class tastecasesTss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestCase_Problems_ProblemID",
                table: "TestCase");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TestCase",
                table: "TestCase");

            migrationBuilder.RenameTable(
                name: "TestCase",
                newName: "TestCases");

            migrationBuilder.RenameIndex(
                name: "IX_TestCase_ProblemID",
                table: "TestCases",
                newName: "IX_TestCases_ProblemID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TestCases",
                table: "TestCases",
                column: "TestCaseID");

            migrationBuilder.AddForeignKey(
                name: "FK_TestCases_Problems_ProblemID",
                table: "TestCases",
                column: "ProblemID",
                principalTable: "Problems",
                principalColumn: "ProblemID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestCases_Problems_ProblemID",
                table: "TestCases");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TestCases",
                table: "TestCases");

            migrationBuilder.RenameTable(
                name: "TestCases",
                newName: "TestCase");

            migrationBuilder.RenameIndex(
                name: "IX_TestCases_ProblemID",
                table: "TestCase",
                newName: "IX_TestCase_ProblemID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TestCase",
                table: "TestCase",
                column: "TestCaseID");

            migrationBuilder.AddForeignKey(
                name: "FK_TestCase_Problems_ProblemID",
                table: "TestCase",
                column: "ProblemID",
                principalTable: "Problems",
                principalColumn: "ProblemID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
