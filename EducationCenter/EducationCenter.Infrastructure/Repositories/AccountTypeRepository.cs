using EducationCenter.Core.Entities;
using EducationCenter.Core.Interfaces;
using EducationCenter.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EducationCenter.Infrastructure.Repositories
{
    public class AccountTypeRepository : IAccountTypeRepository
    {
        private readonly MyContext _context;
        public AccountTypeRepository(MyContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<AccountType>> GetAllAccountTypes()
        {
            return await _context.AccountTypes.ToListAsync();
        }
    }
}
