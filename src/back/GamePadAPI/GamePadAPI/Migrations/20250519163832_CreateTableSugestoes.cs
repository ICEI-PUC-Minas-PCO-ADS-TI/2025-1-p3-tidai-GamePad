using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamePadAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreateTableSugestoes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sugestoes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sugestoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sugestoes_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            // migrationBuilder.CreateIndex(
            //    name: "IX_Posts_UsuarioId",
            //    table: "Posts",
            //    column: "UsuarioId");

            // migrationBuilder.CreateIndex(
            //    name: "IX_Avaliacoes_UsuarioId",
            //    table: "Avaliacoes",
            //    column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Sugestoes_UsuarioId",
                table: "Sugestoes",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropTable(
                name: "Sugestoes");

            // migrationBuilder.DropIndex(
            //    name: "IX_Posts_UsuarioId",
            //    table: "Posts");

            // migrationBuilder.DropIndex(
            //    name: "IX_Avaliacoes_UsuarioId",
            //    table: "Avaliacoes");

        }
    }
}
