using Microsoft.Azure.Functions.Worker.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using System.Threading.Tasks;
using TaskManager.Functions.Extensions;

namespace TaskManager.Functions
{
    public class Program
    {
        public static async Task Main()
        {
            // Initialize serilog logger
            Log.Logger = new LoggerConfiguration()
                 .WriteTo.Console(Serilog.Events.LogEventLevel.Debug)
                 .MinimumLevel.Debug()
                 .Enrich.FromLogContext()
                 .CreateLogger();

            var host = new HostBuilder()
                .ConfigureFunctionsWorkerDefaults()
                .ConfigureServices(services =>
                {
                    // Add logging
                    services.AddSingleton(LoggerFactory.Create(builder =>
                    {
                        builder
                            .AddSerilog(dispose: true);
                    }));

                    // Add data service
                    services.AddTaskInMemoryDataService();
                })
                .Build();

            await host.RunAsync();
        }
    }
}