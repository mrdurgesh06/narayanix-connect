using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NarayanixConnect.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminRolesAndPermissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "UQ_nrx_con_admin_Email",
                table: "nrx_con_admin");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "nrx_con_admin",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "nrx_con_admin",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "MustChangePassword",
                table: "nrx_con_admin",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "nrx_con_admin",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserCode",
                table: "nrx_con_admin",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                computedColumnSql: "CASE WHEN [Id] < 10000 THEN 'NRXCON' + RIGHT('0000' + CONVERT(varchar(10), [Id]), 4) ELSE 'NRXCON' + CONVERT(varchar(10), [Id]) END",
                stored: true);

            migrationBuilder.CreateTable(
                name: "nrx_con_admin_permission",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdminId = table.Column<int>(type: "int", nullable: false),
                    PermissionKey = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nrx_con_admin_permission", x => x.Id);
                    table.ForeignKey(
                        name: "FK_nrx_con_admin_permission_nrx_con_admin",
                        column: x => x.AdminId,
                        principalTable: "nrx_con_admin",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "UQ_nrx_con_admin_Email",
                table: "nrx_con_admin",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UQ_nrx_con_admin_UserCode",
                table: "nrx_con_admin",
                column: "UserCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ_nrx_con_admin_permission_AdminId_PermissionKey",
                table: "nrx_con_admin_permission",
                columns: new[] { "AdminId", "PermissionKey" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "nrx_con_admin_permission");

            migrationBuilder.DropIndex(
                name: "UQ_nrx_con_admin_Email",
                table: "nrx_con_admin");

            migrationBuilder.DropIndex(
                name: "UQ_nrx_con_admin_UserCode",
                table: "nrx_con_admin");

            migrationBuilder.DropColumn(
                name: "UserCode",
                table: "nrx_con_admin");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "nrx_con_admin");

            migrationBuilder.DropColumn(
                name: "MustChangePassword",
                table: "nrx_con_admin");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "nrx_con_admin");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "nrx_con_admin",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "UQ_nrx_con_admin_Email",
                table: "nrx_con_admin",
                column: "Email",
                unique: true);
        }
    }
}
