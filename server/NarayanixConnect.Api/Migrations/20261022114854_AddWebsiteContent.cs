using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NarayanixConnect.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddWebsiteContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "nrx_con_website_content",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SectionKey = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ContentJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nrx_con_website_content", x => x.Id);
                    table.CheckConstraint("CK_nrx_con_website_content_ContentJson", "ISJSON([ContentJson]) = 1");
                });

            migrationBuilder.CreateIndex(
                name: "UQ_nrx_con_website_content_SectionKey",
                table: "nrx_con_website_content",
                column: "SectionKey",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "nrx_con_website_content");
        }
    }
}
