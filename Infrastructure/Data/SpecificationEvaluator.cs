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
            if (spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy); // x => x.Price
            }
            if (spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending); // x => x.Price
            }
            return query;
        }

        public static IQueryable<TResult> GetQuery<TSpec,TResult>(IQueryable<T> query, 
            ISpecifications<T, TResult> spec)
        {
            if (spec.Criteria != null)
            {
                query = query.Where(spec.Criteria); // X => X.Brand == brand
            }
            if (spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy); // x => x.Price
            }
            if (spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending); // x => x.Price
            }

            var selectQuery = query as IQueryable<TResult>;
            if(spec.Select!= null)
            {
                selectQuery = query.Select(spec.Select);
            }
            return selectQuery?? query.Cast<TResult>();
        }
    }
}
