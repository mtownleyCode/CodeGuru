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
            entity.Property(e => e.KeyWord1)
                .HasMaxLength(300)
                .HasColumnName("keyWord");
            entity.Property(e => e.KeyWordCategory)
                .HasMaxLength(100)
                .HasColumnName("keyWordCategory");
        });

        modelBuilder.Entity<Snippet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Snippets__3213E83FFCAE667A");

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
            entity.Property(e => e.Snippet1)
                .HasMaxLength(4000)
                .HasColumnName("snippet");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.User).WithMany(p => p.Snippets)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Snippets__userId__403A8C7D");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83F04C7E491");

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
