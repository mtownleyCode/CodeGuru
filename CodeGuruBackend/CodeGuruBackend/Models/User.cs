using System;
using System.Collections.Generic;

namespace CodeGuruBackend.Models;

public partial class User
{
    public int Id { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? UserLevel { get; set; }

    public virtual ICollection<SnippetStat> SnippetStats { get; set; } = new List<SnippetStat>();
}
