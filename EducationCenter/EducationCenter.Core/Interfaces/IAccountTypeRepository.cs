using EducationCenter.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EducationCenter.Core.Interfaces
{
    public interface IAccountTypeRepository: IRepository<AccountType>
    {
        Task<IEnumerable<AccountType>> GetAllAccountTypes();
    }
}
