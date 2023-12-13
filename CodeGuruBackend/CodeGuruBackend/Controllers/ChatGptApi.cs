using CodeGuruBackend.Models;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Completions;
using System.Text.Json;

namespace CodeGuruBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatGptApi : ControllerBase
    {
        [HttpPost]
        [Route("getanswer")]
        public IActionResult GetResult(ChatGpt chatGpt)
        {
            //your OpenAI API key
            string apiKey = Secret.APIKey;
            var openai = new OpenAIAPI(apiKey);
            CompletionRequest completion = new CompletionRequest();
            completion.Prompt = chatGpt.Prompt;
            completion.Model = "text-davinci-003";
            completion.MaxTokens = 4000;
            completion.Temperature = 0.1;
            var result = openai.Completions.CreateCompletionAsync(completion);
            if (result != null)
            {
                foreach (var item in result.Result.Completions)
                {
                    chatGpt.Response = item.Text;
                }

                return Ok(chatGpt);
            }
            else
            {
                return BadRequest("Not found");
            }
        }

    }
}
