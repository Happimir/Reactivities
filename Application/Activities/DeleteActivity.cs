using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public Guid Id {get; set;}
            
            public Command(Guid Id)
            {
                this.Id = Id;    
            }
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
                context.Activities.Remove(activity);
                var success = await context.SaveChangesAsync() > 0;

                if(success) {
                    return Unit.Value;
                }

                throw new Exception("Failed saving changes");
            }
        }
    }
}