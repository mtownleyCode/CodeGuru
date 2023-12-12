using System;
using System.Collections.Generic;

namespace CodeGuruBackend.Models;

public partial class Language
{
    public int Id { get; set; }

    public string? LanguageText { get; set; }

    public string? Image { get; set; }
}
