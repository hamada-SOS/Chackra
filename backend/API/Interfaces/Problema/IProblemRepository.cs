using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using API.Models;

namespace API.Interfaces.Problema
{
    public interface IProblemRepository
    {
        Task <List<Problem>> GetProblemsByCatagoryAsync(string Catagory);
        
    }
}