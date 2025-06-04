using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamePadAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddIgdbGameIdToAvaliacao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Avaliacoes_Jogos_JogoId",
                table: "Avaliacoes");

            migrationBuilder.AlterColumn<int>(
                name: "JogoId",
                table: "Avaliacoes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<long>(
                name: "IgdbGameId",
                table: "Avaliacoes",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Avaliacoes_Jogos_JogoId",
                table: "Avaliacoes",
                column: "JogoId",
                principalTable: "Jogos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Avaliacoes_Jogos_JogoId",
                table: "Avaliacoes");

            migrationBuilder.DropColumn(
                name: "IgdbGameId",
                table: "Avaliacoes");

            migrationBuilder.AlterColumn<int>(
                name: "JogoId",
                table: "Avaliacoes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Avaliacoes_Jogos_JogoId",
                table: "Avaliacoes",
                column: "JogoId",
                principalTable: "Jogos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
