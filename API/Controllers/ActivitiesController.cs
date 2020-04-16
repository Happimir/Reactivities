using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{

    public class ActivitiesController : BaseController
    {

        [HttpGet]
        [Authorize]
        [Route("[action]")]
        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct) {
            return await Mediator.Send(new ListActivity.Query(), ct);
        }

        [HttpGet]
        [Authorize]
        [Route("[action]/{id}")]

        public async Task<ActionResult<Activity>> Detail(Guid id) {
            return await Mediator.Send(new ActivityDetail.Query(id));
        }

        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public async Task<ActionResult<Unit>> Create(CreateActivity.Command command) {
            return await Mediator.Send(command);
        }

        [HttpPut]
        [Authorize]
        [Route("[action]/{id}")]
        public async Task<ActionResult<Unit>> Update(Guid id, EditActivity.Command command) {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete]
        [Authorize]
        [Route("[action]/{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id) {
            return await Mediator.Send(new DeleteActivity.Command(id));
        }
    }
}