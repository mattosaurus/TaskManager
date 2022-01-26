using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Functions.Models;
using TaskManager.Functions.Services;

namespace TaskManager.Functions.Extensions
{
    public static class TaskDataServiceCollectionExtensions
    {
        public static IServiceCollection AddTaskInMemoryDataService(this IServiceCollection collection)
        {
            if (collection == null) throw new ArgumentNullException(nameof(collection));

            collection.AddSingleton<IDictionary<Guid, TaskItem>, ConcurrentDictionary<Guid, TaskItem>>();
            return collection.AddSingleton<ITaskDataService, TaskInMemoryService>();
        }
    }
}
