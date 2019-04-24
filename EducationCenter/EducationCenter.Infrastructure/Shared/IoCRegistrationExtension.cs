using EducationCenter.Core.Interfaces;
using EducationCenter.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace EducationCenter.Infrastructure.Shared
{
    public static class IoCRegistrationExtension
    {
        public static void RegisterIoCDependencies(this IServiceCollection services)
        {
            services.AddScoped<IAccountTypeRepository,AccountTypeRepository>();
        }
    }
}
