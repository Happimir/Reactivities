using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class EditActivity
    {
        public class Command : IRequest
        {
            public Guid Id {get; set;}
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category {get; set;}
            public DateTime Date {get; set;}
            public string City {get; set;}
            public string Venue {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // create object here to save
                var activity = await context.Activities.FindAsync(request.Id);

                if(activity == null) {
                    throw new Exception("No Activity Found");
                }

                activity.Update(request.Title, request.Description, request.Category, request.Date, request.City, request.Venue);
                var success = await context.SaveChangesAsync() > 0;
                if(success) {
                    return Unit.Value;
                }

                throw new Exception("Failed saving changes");
            }

        }
    }
}