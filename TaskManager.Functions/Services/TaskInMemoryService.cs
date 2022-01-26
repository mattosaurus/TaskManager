using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Functions.Models;

namespace TaskManager.Functions.Services
{
    public class TaskInMemoryService : ITaskDataService
    {
        private readonly ILogger<TaskInMemoryService> _logger;
        private readonly IDictionary<Guid, TaskItem> _dataStore;

        public TaskInMemoryService(ILoggerFactory loggerFactory, IDictionary<Guid, TaskItem> dataStore)
        {
            _logger = loggerFactory.CreateLogger<TaskInMemoryService>();
            _dataStore = dataStore;
        }

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return _dataStore.Values.AsEnumerable();
        }

        public async Task<TaskItem> GetTaskByIdAsync(Guid id)
        {
            return _dataStore[id];
        }

        public async Task CreateTaskAsync(TaskItem task)
        {
            _dataStore.TryAdd(task.Id, task);
        }

        public async Task UpdateTaskAsync(TaskItem task)
        {
            if (_dataStore.ContainsKey(task.Id))
                _dataStore[task.Id] = task;
        }
    }
}
