using System;
using System.Collections.Generic;

namespace CodeGuruBackend.Models;

public partial class QueryTemplate
{
    public int Id { get; set; }

    public string? Language { get; set; }

    public string? ElementType { get; set; }
}
