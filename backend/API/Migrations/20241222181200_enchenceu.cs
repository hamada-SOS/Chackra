using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class enchenceu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leaderboards_AspNetUsers_StudentID",
                table: "Leaderboards");

            migrationBuilder.DropForeignKey(
                name: "FK_Leaderboards_Problems_ProblemID",
                table: "Leaderboards");

            migrationBuilder.DropIndex(
                name: "IX_Leaderboards_ProblemID",
                table: "Leaderboards");

            migrationBuilder.RenameColumn(
                name: "Points",
                table: "Submissions",
                newName: "Score");

            migrationBuilder.RenameColumn(
                name: "StudentID",
                table: "Leaderboards",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Ranking",
                table: "Leaderboards",
                newName: "TotalScore");

            migrationBuilder.RenameColumn(
                name: "ProblemID",
                table: "Leaderboards",
                newName: "Rank");

            migrationBuilder.RenameColumn(
                name: "Points",
                table: "Leaderboards",
                newName: "ContestId");

            migrationBuilder.RenameColumn(
                name: "LeaderboardID",
                table: "Leaderboards",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Leaderboards_StudentID",
                table: "Leaderboards",
                newName: "IX_Leaderboards_UserId");

            migrationBuilder.AddColumn<DateTime>(
                name: "SubmissionTime",
                table: "Submissions",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "Participants",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastSubmissionTime",
                table: "Leaderboards",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TeamName",
                table: "Leaderboards",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Contests",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Leaderboards_ContestId",
                table: "Leaderboards",
                column: "ContestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaderboards_AspNetUsers_UserId",
                table: "Leaderboards",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaderboards_Contests_ContestId",
                table: "Leaderboards",
                column: "ContestId",
                principalTable: "Contests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leaderboards_AspNetUsers_UserId",
                table: "Leaderboards");

            migrationBuilder.DropForeignKey(
                name: "FK_Leaderboards_Contests_ContestId",
                table: "Leaderboards");

            migrationBuilder.DropIndex(
                name: "IX_Leaderboards_ContestId",
                table: "Leaderboards");

            migrationBuilder.DropColumn(
                name: "SubmissionTime",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "Participants");

            migrationBuilder.DropColumn(
                name: "LastSubmissionTime",
                table: "Leaderboards");

            migrationBuilder.DropColumn(
                name: "TeamName",
                table: "Leaderboards");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Contests");

            migrationBuilder.RenameColumn(
                name: "Score",
                table: "Submissions",
                newName: "Points");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Leaderboards",
                newName: "StudentID");

            migrationBuilder.RenameColumn(
                name: "TotalScore",
                table: "Leaderboards",
                newName: "Ranking");

            migrationBuilder.RenameColumn(
                name: "Rank",
                table: "Leaderboards",
                newName: "ProblemID");

            migrationBuilder.RenameColumn(
                name: "ContestId",
                table: "Leaderboards",
                newName: "Points");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Leaderboards",
                newName: "LeaderboardID");

            migrationBuilder.RenameIndex(
                name: "IX_Leaderboards_UserId",
                table: "Leaderboards",
                newName: "IX_Leaderboards_StudentID");

            migrationBuilder.CreateIndex(
                name: "IX_Leaderboards_ProblemID",
                table: "Leaderboards",
                column: "ProblemID");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaderboards_AspNetUsers_StudentID",
                table: "Leaderboards",
                column: "StudentID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaderboards_Problems_ProblemID",
                table: "Leaderboards",
                column: "ProblemID",
                principalTable: "Problems",
                principalColumn: "ProblemID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
