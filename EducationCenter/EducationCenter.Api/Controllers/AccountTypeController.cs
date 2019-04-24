using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EducationCenter.Core.Entities;
using EducationCenter.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EducationCenter.Api.Controllers
{
    [Route("api/accountTypes")]
    [ApiController]
    public class AccountTypeController : ControllerBase
    {
        private readonly IAccountTypeRepository _repository;
        public AccountTypeController(IAccountTypeRepository repository)
        {
            _repository = repository;
        }

     

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountType>>> GetAllAccountTypes()
        {
           IEnumerable<AccountType> accountTypes = await _repository.GetAllAccountTypes();
            return Ok(accountTypes);

        }

    }
}