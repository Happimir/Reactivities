using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly DataContext context;
        private IMediator mediator;
        public ActivitiesController(DataContext context, IMediator mediator) {
            this.context = context;
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> Get() {
            var values = await context.Activities.ToListAsync();
            return Ok(values);
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct) {
            return await mediator.Send(new ListActivity.Query(), ct);
        }

        [HttpGet]
        [Route("[action]/{id}")]

        public async Task<ActionResult<Activity>> Detail(Guid id) {
            return await mediator.Send(new ActivityDetail.Query(id));
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<Unit>> Create(CreateActivity.Command command) {
            return await mediator.Send(command);
        }

        [HttpPut]
        [Route("[action]/{id}")]
        public async Task<ActionResult<Unit>> Update(Guid id, EditActivity.Command command) {
            command.Id = id;
            return await mediator.Send(command);
        }

        [HttpDelete]
        [Route("[action]/{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id) {
            return await mediator.Send(new DeleteActivity.Command(id));
        }
    }
}