using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Functions.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; } = new Guid();

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public string Status { get; set; }
    }
}
