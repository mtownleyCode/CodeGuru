using System;
using System.Collections.Generic;

namespace CodeGuruBackend.Models;

public partial class Snippet
{
    public int Id { get; set; }

    public string? Language { get; set; }

    public string? Description { get; set; }

    public string? CodeSnippet { get; set; }

    public string? KeyWord { get; set; }
}
