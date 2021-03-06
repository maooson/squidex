﻿// ==========================================================================
//  ReferencesField.cs
//  Squidex Headless CMS
// ==========================================================================
//  Copyright (c) Squidex Group
//  All rights reserved.
// ==========================================================================

namespace Squidex.Domain.Apps.Core.Schemas
{
    public sealed class ReferencesField : Field<ReferencesFieldProperties>
    {
        public ReferencesField(long id, string name, Partitioning partitioning)
            : base(id, name, partitioning, new ReferencesFieldProperties())
        {
        }

        public ReferencesField(long id, string name, Partitioning partitioning, ReferencesFieldProperties properties)
            : base(id, name, partitioning, properties)
        {
        }

        public override T Accept<T>(IFieldVisitor<T> visitor)
        {
            return visitor.Visit(this);
        }
    }
}
