using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class BrandListSpecifications: BaseSpecifications<Product, string>
    {
        public BrandListSpecifications()
        {
            AddSelect(x => x.Brand);
            ApplyDistinct();
        }
    }
}
