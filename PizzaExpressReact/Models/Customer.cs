using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

using System.ComponentModel.DataAnnotations;

namespace PizzaExpressAPI.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string FistName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public int PostalCode { get; set; } 
        public bool Status { get; set; }

        [Column(TypeName = "date")]
        [DisplayFormat(DataFormatString = "{0:ddMMyyyy}")]
        public DateTime CreateDate { get; set; }

        [Column(TypeName = "date")]
        [DisplayFormat(DataFormatString = "{0:ddMMyyyy}")]
        public DateTime? ModifiedDate { get; set; }

    }
}
