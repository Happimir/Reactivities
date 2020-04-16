using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User>
        {

        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> manager;
            private readonly IJWTGenerator generator;
            private readonly IUserAccessor accessor;
            public Handler(UserManager<AppUser> manager, IJWTGenerator generator, IUserAccessor accessor)
            {
                this.accessor = accessor;
                this.generator = generator;
                this.manager = manager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await manager.FindByNameAsync(accessor.GetCurrentUserName());

                return new User {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Token = generator.CreateToken(user),
                    Image = null
                };
            }
        }
    }
}