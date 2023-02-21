using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaExpressAPI.Data;
using PizzaExpressAPI.Models;

namespace PizzaExpressAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly DataContext _context;
        public CustomerController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetListCustomers")]
        public async Task<ActionResult<List<Customer>>> GetListCustomers()
        {
            return Ok(await _context.Customers.Where(e => e.Status == true).ToListAsync());
        }

        [HttpGet]
        [Route("GetCustomer/{id}")]
        public async Task<ActionResult<List<Customer>>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if(customer == null)
            {
                return BadRequest("This customer does not exist.");
            }

            return Ok(customer);
        }

        [HttpPost]
        [Route("AddCustomer")]
        public async Task<ActionResult<List<Customer>>> AddCustomer([FromBody] Customer customer)
        {
            //customer.PostalCode = 10;
            customer.Status = true;
            customer.CreateDate = DateTime.Now;
            customer.ModifiedDate = null;

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpPut]
        [Route("UpdateCustomer")]
        public async Task<ActionResult<List<Customer>>> UpdateCustomer([FromBody] Customer customer)
        {
            var dbcustomer = await _context.Customers.FindAsync(customer.Id);
            if (dbcustomer == null)
                return BadRequest("This hero does not exist.");

            dbcustomer.FistName = customer.FistName;
            dbcustomer.LastName = customer.LastName;
            dbcustomer.Phone = customer.Phone;
            dbcustomer.Email = customer.Email;
            dbcustomer.Address = customer.Address;
            dbcustomer.City = customer.City;
            dbcustomer.PostalCode = customer.PostalCode;
            dbcustomer.Status = true;
            dbcustomer.ModifiedDate = DateTime.Now;

            _context.Customers.Update(dbcustomer);
            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpPut]
        [Route("DesactiveCustomer/{id}")]
        public async Task<ActionResult<List<Customer>>> DesactiveCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
                return BadRequest("This customer does not exist.");            

            customer.Status = false;
            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Customer>>> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
                return BadRequest("This customer does not exist.");            

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }
    }
}
