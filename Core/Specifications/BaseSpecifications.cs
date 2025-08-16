using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class BaseSpecifications<T>(Expression<Func<T, bool>>? criteria) : ISpecifications<T>
    {
        protected BaseSpecifications() : this(null) { }
        public Expression<Func<T, bool>>? Criteria => criteria;
    }
}
