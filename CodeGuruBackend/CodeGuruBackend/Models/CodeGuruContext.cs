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

    public virtual DbSet<Snippet> Snippets { get; set; }

    public virtual DbSet<SnippetStat> SnippetStats { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=IRVING-PC;Database=CodeGuru;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<KeyWord>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__KeyWords__3213E83F082E7DCB");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.KeyWordText)
                .HasMaxLength(300)
                .HasColumnName("keyWord");
            entity.Property(e => e.KeyWordCategory)
                .HasMaxLength(100)
                .HasColumnName("keyWordCategory");
        });

        modelBuilder.Entity<Snippet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Snippets__3213E83FC681B25E");

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
            entity.Property(e => e.CodeSnippet)
                .HasMaxLength(4000)
                .HasColumnName("snippet");
        });

        modelBuilder.Entity<SnippetStat>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.SnippetId).HasColumnName("snippetId");
            entity.Property(e => e.SnippetLike).HasColumnName("snippetLike");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Snippet).WithMany()
                .HasForeignKey(d => d.SnippetId)
                .HasConstraintName("FK__SnippetSt__snipp__440B1D61");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__SnippetSt__userI__4316F928");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83FE30F9633");

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
