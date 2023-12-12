using System;
using System.Collections.Generic;

namespace CodeGuruBackend.Models;

public partial class Snippet
{
    public int Id { get; set; }

    public string? Language { get; set; }

    public string? Description { get; set; }

    public string? SnippetText { get; set; }

    public string? KeyWord { get; set; }

    public virtual ICollection<SnippetStat> SnippetStats { get; set; } = new List<SnippetStat>();
}
