using System;
using System.Collections.Generic;

namespace CodeGuruBackend.Models;

public partial class Snippet
{
    public int Id { get; set; }

    public string? Language { get; set; }

    public string? Description { get; set; }

    public string? Snippet1 { get; set; }

    public string? KeyWord { get; set; }

    public int? UserId { get; set; }

    public virtual User? User { get; set; }
}
