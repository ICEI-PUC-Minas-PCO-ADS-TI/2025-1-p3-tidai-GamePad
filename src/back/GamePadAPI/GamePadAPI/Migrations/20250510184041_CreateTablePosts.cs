using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamePadAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreateTablePosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Usuarios_UsuarioId",
                table: "Posts",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Usuarios_UsuarioId",
                table: "Posts");
        }
    }
}
