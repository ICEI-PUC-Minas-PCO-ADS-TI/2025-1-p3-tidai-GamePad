using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamePadAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddBioAndFavoriteGamesToUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FavoriteGames",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bio",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "FavoriteGames",
                table: "Usuarios");
        }
    }
}
