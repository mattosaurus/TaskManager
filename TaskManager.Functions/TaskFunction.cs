using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Azure.Core.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using TaskManager.Functions.Models;
using TaskManager.Functions.Services;

namespace TaskManager.Functions
{
    public class TaskFunction
    {
        private readonly ILogger<TaskFunction> _logger;
        private readonly ITaskDataService _taskDataService;

        public TaskFunction(ILoggerFactory loggerFactory, ITaskDataService taskDataService)
        {
            _logger = loggerFactory.CreateLogger<TaskFunction>();
            _taskDataService = taskDataService;
        }

        [Function("Tasks")]
        public async Task<HttpResponseData> SetTaskAsync([HttpTrigger(AuthorizationLevel.Function, "get", "post", "put")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            var response = req.CreateResponse(HttpStatusCode.OK);

            JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            NewtonsoftJsonObjectSerializer serializer = new NewtonsoftJsonObjectSerializer(jsonSerializerSettings);

            TaskItem task = JsonConvert.DeserializeObject<TaskItem>(await new StreamReader(req.Body).ReadToEndAsync());

            switch (req.Method)
            {
                case "GET":
                    await response.WriteAsJsonAsync(await _taskDataService.GetAllTasksAsync(), serializer);
                    break;
                case "POST":
                    await _taskDataService.CreateTaskAsync(task);
                    break;
                case "PUT":
                    await _taskDataService.UpdateTaskAsync(task);
                    break;
            }

            return response;
        }
    }
}
