using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamePadAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTableAvaliacoes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Avaliacoes_UsuarioId",
                table: "Avaliacoes",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Avaliacoes_Usuarios_UsuarioId",
                table: "Avaliacoes",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Avaliacoes_Usuarios_UsuarioId",
                table: "Avaliacoes");

            migrationBuilder.DropIndex(
                name: "IX_Avaliacoes_UsuarioId",
                table: "Avaliacoes");

            migrationBuilder.AddColumn<int>(
                name: "JogoId",
                table: "Avaliacoes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
