using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
   public class TypeListSpecifications: BaseSpecifications<Product, string>
    {
        public TypeListSpecifications()
        {
            AddSelect(x => x.Type);
            ApplyDistinct();
        }
    }
}
