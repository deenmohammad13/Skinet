using System.Net;
using System.Runtime.CompilerServices;
using System.Text.Json;

namespace API.MIddleware
{
    public class ExceptionMiddleware(IHostEnvironment env, RequestDelegate next)
    {
        public async Task InvokeAsync(HttpContext context)
        {
			try
			{
				await next(context);
			}
			catch (Exception ex)
			{
				await HandleExceptionAsync(context, ex, env);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex, IHostEnvironment env)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = env.IsDevelopment()
                ? new Errors.ApiErrorResponse(context.Response.StatusCode, ex.Message, ex.StackTrace)
                : new Errors.ApiErrorResponse(context.Response.StatusCode, ex.Message, "Internal Server Error");

            var oprions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, oprions);
            
            return context.Response.WriteAsync(json);
        }
    }
}
