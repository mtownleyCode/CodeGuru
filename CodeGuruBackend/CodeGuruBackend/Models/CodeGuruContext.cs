using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CodeGuruBackend.Models;

public partial class CodeGuruContext : DbContext
{
    public CodeGuruContext()
    {
    }

    public CodeGuruContext(DbContextOptions<CodeGuruContext> options)
        : base(options)
    {
    }

    public virtual DbSet<KeyWord> KeyWords { get; set; }

    public virtual DbSet<Language> Languages { get; set; }

    public virtual DbSet<QueryTemplate> QueryTemplates { get; set; }

    public virtual DbSet<Snippet> Snippets { get; set; }

    public virtual DbSet<SnippetStat> SnippetStats { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(Secret.ConnectionString);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<KeyWord>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__KeyWords__3213E83F1DAC26FE");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.KeyWordText)
                .HasMaxLength(300)
                .HasColumnName("keyWord");
            entity.Property(e => e.KeyWordCategory)
                .HasMaxLength(100)
                .HasColumnName("keyWordCategory");
        });

        modelBuilder.Entity<Language>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Language__3213E83F9101048B");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Image).HasMaxLength(100);
            entity.Property(e => e.LanguageText)
                .HasMaxLength(50)
                .HasColumnName("language");
        });

        modelBuilder.Entity<QueryTemplate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__QueryTem__3213E83F48F9A75F");

            entity.ToTable("QueryTemplate");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ElementType)
                .HasMaxLength(25)
                .HasColumnName("elementType");
            entity.Property(e => e.Language)
                .HasMaxLength(25)
                .HasColumnName("language");
        });

        modelBuilder.Entity<Snippet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Snippets__3213E83FDD356BF2");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(300)
                .HasColumnName("description");
            entity.Property(e => e.KeyWord)
                .HasMaxLength(300)
                .HasColumnName("keyWord");
            entity.Property(e => e.Language)
                .HasMaxLength(100)
                .HasColumnName("language");
            entity.Property(e => e.SnippetText)
                .HasMaxLength(4000)
                .HasColumnName("snippet");
        });

        modelBuilder.Entity<SnippetStat>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SnippetS__3213E83FAFEA2147");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.SnippetId).HasColumnName("snippetId");
            entity.Property(e => e.SnippetLike).HasColumnName("snippetLike");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Snippet).WithMany(p => p.SnippetStats)
                .HasForeignKey(d => d.SnippetId)
                .HasConstraintName("FK__SnippetSt__snipp__4E88ABD4");

            entity.HasOne(d => d.User).WithMany(p => p.SnippetStats)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__SnippetSt__userI__4D94879B");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83FF9F0A181");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("lastName");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .HasColumnName("password");
            entity.Property(e => e.UserLevel)
                .HasMaxLength(100)
                .HasColumnName("userLevel");
            entity.Property(e => e.Username)
                .HasMaxLength(100)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
