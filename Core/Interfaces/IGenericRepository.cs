using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T?> GetIdByAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T?> GetEntity(ISpecifications<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecifications<T> spec);
        Task<TResult?> GetEntity<TResult>(ISpecifications<T, TResult> spec);
        Task<IReadOnlyList<TResult>> ListAsync<TResult>(ISpecifications<T, TResult> spec);
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        Task<bool> SaveAllAsync();
        bool Exists(int id);

        Task<int> CountAsync(ISpecifications<T> spec);
    }
}
