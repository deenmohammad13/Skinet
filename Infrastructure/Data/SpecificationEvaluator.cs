using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<T> where T : BaseEntity
    {
        public static IQueryable<T> GetQuery(IQueryable<T> query, ISpecifications<T> spec)
        {
            if(spec.Criteria != null)
            {
                query = query.Where(spec.Criteria); // X => X.Brand == brand
            }
            return query;
        }
    }
}
