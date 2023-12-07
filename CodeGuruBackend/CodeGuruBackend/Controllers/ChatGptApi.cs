using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Completions;

namespace CodeGuruBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatGptApi : ControllerBase
    {
        [HttpPost]
        [Route("getanswer")]
        public IActionResult GetResult([FromBody] string prompt)
        {
            //your OpenAI API key
            string apiKey = "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";
            string answer = string.Empty;
            var openai = new OpenAIAPI(apiKey);
            CompletionRequest completion = new CompletionRequest();
            completion.Prompt = prompt;
            completion.Model = "text-davinci-003";
            completion.MaxTokens = 4000;
            var result = openai.Completions.CreateCompletionAsync(completion);
            if (result != null)
            {
                foreach (var item in result.Result.Completions)
                {
                    answer = item.Text;
                }
                return Ok(answer);
            }
            else
            {
                return BadRequest("Not found");
            }
        }

    }
}
