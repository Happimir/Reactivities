using System;

namespace Domain
{
    public class Activity
    {
        public Guid Id {get; set;}
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category {get; set;}
        public DateTime Date {get; set;}
        public string City {get; set;}
        public string Venue {get; set;}

        public void Update(string title, string description, string category, DateTime? date, string city, string venue) {
            Title = title ?? Title;
            Description = description ?? Description;
            Category = category ?? Category;
            Date = date ?? Date;
            City = city ?? City;
            Venue = venue ?? Venue;
        }
    }
}