using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces.Account
{
    public interface IStudentRepository
    {
        Task<ApplicationUser> GetByUniversityIdAsync(string universityId);
        Task UpdateUserAsync(ApplicationUser user);
    }

}