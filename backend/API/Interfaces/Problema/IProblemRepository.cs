using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Problemea;
using API.Helpers;
using API.Models;

namespace API.Interfaces.Problema
{
    public interface IProblemRepository
    {
        Task <List<Problem>> GetProblemsByCatagoryAsync(string Catagory);
        Task<List<ProblemCard>> GetProblemCardsAsync(string Catagory);
        Task<ProblemDetail> GetProblemDetails(int ProblemID);

        
    }
}