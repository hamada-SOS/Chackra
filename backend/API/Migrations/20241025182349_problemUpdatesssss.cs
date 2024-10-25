using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class problemUpdatesssss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Problems_AspNetUsers_CreatorId",
                table: "Problems");

            migrationBuilder.DropIndex(
                name: "IX_Problems_CreatorId",
                table: "Problems");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Problems");

            migrationBuilder.DropColumn(
                name: "Example",
                table: "Problems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatorId",
                table: "Problems",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Example",
                table: "Problems",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Problems_CreatorId",
                table: "Problems",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Problems_AspNetUsers_CreatorId",
                table: "Problems",
                column: "CreatorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
