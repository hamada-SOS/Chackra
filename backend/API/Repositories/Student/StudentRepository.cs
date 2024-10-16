using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces.Account;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Student
{
    public class StudentRepository : IStudentRepository
    {
        private readonly ApplicationDbContext _context;

        public StudentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ApplicationUser> GetByUniversityIdAsync(string universityId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UniversityId == universityId);
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task UpdateUserAsync(ApplicationUser user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

    }

}