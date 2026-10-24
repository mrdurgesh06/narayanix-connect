using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NarayanixConnect.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "nrx_con_admin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nrx_con_admin", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "nrx_con_contact",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Company = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nrx_con_contact", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "nrx_con_proposal",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Company = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Website = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Service = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Budget = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nrx_con_proposal", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "nrx_con_setting",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    WorkingHours = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Logo = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Favicon = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Facebook = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Linkedin = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Instagram = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Youtube = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Whatsapp = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Copyright = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    GoogleMap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Analytics = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nrx_con_setting", x => x.Id);
                    table.CheckConstraint("CK_nrx_con_setting_Singleton", "[Id] = 1");
                });

            migrationBuilder.CreateIndex(
                name: "UQ_nrx_con_admin_Email",
                table: "nrx_con_admin",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_nrx_con_contact_CreatedAt",
                table: "nrx_con_contact",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_nrx_con_proposal_CreatedAt",
                table: "nrx_con_proposal",
                column: "CreatedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "nrx_con_admin");

            migrationBuilder.DropTable(
                name: "nrx_con_contact");

            migrationBuilder.DropTable(
                name: "nrx_con_proposal");

            migrationBuilder.DropTable(
                name: "nrx_con_setting");
        }
    }
}
