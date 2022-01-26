using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Functions.Models;

namespace TaskManager.Functions.Services
{
    public interface ITaskDataService
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();

        Task<TaskItem> GetTaskByIdAsync(Guid id);

        Task CreateTaskAsync(TaskItem task);

        Task UpdateTaskAsync(TaskItem task);
    }
}
