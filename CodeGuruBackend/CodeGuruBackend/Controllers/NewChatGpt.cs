using CodeGuruBackend.Models;
using Microsoft.AspNetCore.Mvc;
using HigLabo.OpenAI;

namespace CodeGuruBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewChatGptAPI : ControllerBase
    {
        [HttpPost]
        [Route("getanswer")]
        public IActionResult GetResult([FromBody] ChatGptClass chatGptClass)
        {
            var apiKey = Secret.APIKey;
            var client = new OpenAIClient(apiKey);

            var p = new ChatCompletionsParameter();
            p.Messages.Add(new ChatMessage(ChatMessageRole.User, chatGptClass.Prompt));
            p.Model = "gpt-3.5-turbo";
            p.Seed = 123;
            var res = client.ChatCompletionsAsync(p);


            if (res != null)
                foreach (var choice in res.Result.Choices)
                {
                    chatGptClass.Response = choice.Message.Content;
                    return Ok(chatGptClass);
                }

            return BadRequest("Not found");

        }

    }

}