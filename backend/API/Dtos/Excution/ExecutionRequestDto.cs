using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace API.Dtos.Excution
{
    public class ExecutionRequestDto
    {
    [JsonProperty("source_code")]
    public string SourceCode { get; set; }

    [JsonProperty("language_id")]
    public int LanguageId { get; set; }

    [JsonProperty("stdin")]
    public string StandardInput { get; set; }
}
}