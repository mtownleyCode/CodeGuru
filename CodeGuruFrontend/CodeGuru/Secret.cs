using Microsoft.CodeAnalysis.Elfie.Diagnostics;

namespace CodeGuruBackend
{
    public class Secret
    {
        public static string ConnectionString { get; } = "Server=ALEX-2020BUILD;Database=Events;Trusted_Connection=True;TrustServerCertificate=True";
		public static string APIKey { get; } = "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";

        public static string RemoteConnectionString { get; } = "Server=tcp:codeguru.database.windows.net,1433;Initial Catalog=CodeGuru;Persist Security Info=False;User ID=codeguru.admin;Password=GrandCircus2023.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
    }
}
