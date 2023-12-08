using System;
using System.Collections.Generic;

namespace CodeGuruBackend.Models;

public partial class SnippetStat
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? SnippetId { get; set; }

    public bool? SnippetLike { get; set; }

    public virtual Snippet? Snippet { get; set; }

    public virtual User? User { get; set; }
}
