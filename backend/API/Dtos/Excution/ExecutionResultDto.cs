using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace API.Dtos.Excution
{
    public class ExecutionResultDto
    {
    [JsonProperty("stdout")]
    public string StandardOutput { get; set; }

    [JsonProperty("stderr")]
    public string StandardError { get; set; }

    [JsonProperty("status_id")]
    public int StatusId { get; set; }

    [JsonProperty("time")]
    public string Time { get; set; }

    [JsonProperty("memory")]
    public int Memory { get; set; }
}
}