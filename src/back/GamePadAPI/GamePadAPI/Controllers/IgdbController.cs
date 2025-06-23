using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GamePadAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IgdbController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private const string ClientId = "d85pv4u80y6424iy6rl8b78q5fqqff"; 
        private const string AccessToken = "snp5t0qnyouxa9useaxzvql0ipidpe"; 

        public IgdbController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("games")]
        public async Task<IActionResult> GetGames(
            [FromQuery] string search = "",
            [FromQuery] string genre = "",
            [FromQuery] string year = "",
            [FromQuery] string platform = "",
            [FromQuery] bool recent = false,
            [FromQuery] bool popular = false,
            [FromQuery] bool best = false,
            [FromQuery] int limit = 50,
            [FromQuery] int offset = 0,
            [FromQuery] int? id = null
        )
        {
            // Limite máximo permitido pela IGDB é 500
            if (limit > 500) limit = 500;
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Client-ID", ClientId);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);

            var sb = new StringBuilder();
            // Se múltiplos ids forem informados, busca todos eles
            var idsFromQuery = Request.Query["id"].ToArray();
            if (idsFromQuery != null && idsFromQuery.Length > 0)
            {
                sb.Append("fields id,name,cover.url,genres.name,first_release_date,platforms.name,summary,screenshots.url,websites.url,websites.category,age_ratings.rating,age_ratings.category,release_dates.human,release_dates.platform,release_dates.region,involved_companies.company.name,involved_companies.developer,involved_companies.publisher,themes.name,game_modes.name,player_perspectives.name,language_supports.language.name,language_supports.language_support_type.name;");
                sb.Append($" where id = ({string.Join(",", idsFromQuery)});");
                sb.Append($" limit {idsFromQuery.Length};");
            }
            else if (id.HasValue)
            {
                sb.Append("fields id,name,cover.url,genres.name,first_release_date,platforms.name,summary,screenshots.url,websites.url,websites.category,age_ratings.rating,age_ratings.category,release_dates.human,release_dates.platform,release_dates.region,involved_companies.company.name,involved_companies.developer,involved_companies.publisher,themes.name,game_modes.name,player_perspectives.name,language_supports.language.name,language_supports.language_support_type.name;");
                sb.Append($" where id = {id.Value};");
                sb.Append(" limit 1;");
            }
            else
            {
                if (!string.IsNullOrWhiteSpace(search))
                {
                    sb.Append($"search \"{search}\"; ");
                }
                sb.Append("fields id,name,cover.url,genres.name,first_release_date,platforms.name,summary,screenshots.url;");

                // Filtros
                var filters = new List<string>();
                if (!string.IsNullOrWhiteSpace(genre))
                {
                    filters.Add($"genres.name = \"{genre}\"");
                }
                if (!string.IsNullOrWhiteSpace(year))
                {
                    if (int.TryParse(year, out int y))
                    {
                        var from = new DateTime(y, 1, 1).Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
                        var to = new DateTime(y + 1, 1, 1).Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
                        filters.Add($"first_release_date >= {Math.Floor(from)} & first_release_date < {Math.Floor(to)}");
                    }
                }
                if (!string.IsNullOrWhiteSpace(platform))
                {
                    // Apenas uma plataforma é permitida
                    filters.Add($"platforms.name = \"{platform}\"");
                }
                if (recent)
                {
                    // últimos 3 meses
                    var now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                    var threeMonthsAgo = now - 60 * 60 * 24 * 30 * 3;
                    filters.Add($"first_release_date > {threeMonthsAgo}");
                }

                if (popular)
                {
                    filters.Add("total_rating != null & total_rating_count > 100");
                }
                if (best)
                {
                    filters.Add("total_rating != null & total_rating_count > 10");
                }

                if (filters.Count > 0)
                {
                    sb.Append(" where ");
                    sb.Append(string.Join(" & ", filters));
                    sb.Append(";");
                }

                // sort deve vir depois do where
                if (popular)
                {
                    sb.Append(" sort total_rating desc;");
                }
                if (best)
                {
                    sb.Append(" sort total_rating desc;");
                }

                sb.Append($" limit {limit}; offset {offset};");
            }

            var query = sb.ToString();
            var content = new StringContent(query, Encoding.UTF8, "text/plain");
            var response = await client.PostAsync("https://api.igdb.com/v4/games", content);
            var result = await response.Content.ReadAsStringAsync();

            return Content(result, "application/json");
        }
        [HttpGet("platforms")]
        public async Task<IActionResult> GetPlatforms()
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Client-ID", ClientId);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);

            var query = "fields id,name,abbreviation,category,platform_family.name; limit 100;";
            var content = new StringContent(query, Encoding.UTF8, "text/plain");
            var response = await client.PostAsync("https://api.igdb.com/v4/platforms", content);
            var result = await response.Content.ReadAsStringAsync();
            return Content(result, "application/json");
        }

        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Client-ID", ClientId);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);

            var query = "fields id,name,slug; limit 100;";
            var content = new StringContent(query, Encoding.UTF8, "text/plain");
            var response = await client.PostAsync("https://api.igdb.com/v4/genres", content);
            var result = await response.Content.ReadAsStringAsync();
            return Content(result, "application/json");
        }
    }
}
