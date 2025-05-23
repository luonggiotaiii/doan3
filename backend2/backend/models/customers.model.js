import db from '../common/db.js';
import logger from '../common/logger.js';

class Customers {
	constructor(customers) {
		this.customer_id = customers.customer_id;
		this.username = customers.username;
		this.email = customers.email;
		this.password_hash = customers.password_hash;
		this.full_name = customers.full_name;
		this.birth_date = customers.birth_date;
		this.gender = customers.gender;
		this.phone = customers.phone;
		this.address = customers.address;
		this.created_at = customers.created_at;
		this.updated_at = customers.updated_at;
	}

	static async query(sql, params) {
		try {
			return await db.query(sql, params);
		} catch (error) {
			logger.error(`Database query error: ${error.message}`, { sql, params, stack: error.stack });
			throw new Error(`Database error: ${error.message}`);
		}
	}

	static async getAll({ limit = 10, offset = 0 } = {}) {
		const sql = 'SELECT * FROM customers LIMIT ? OFFSET ?';
		const [result] = await this.query(sql, [limit, offset]);
		return result;
	}

	static async getAllWithoutPagination() {
		const sql = 'SELECT * FROM customers';
		const [result] = await this.query(sql);
		return result;
	}

	static async getCount() {
		const sql = 'SELECT COUNT(*) as total FROM customers';
		const [result] = await this.query(sql);
		return result[0].total;
	}

	static async getById(id) {
		const sql = 'SELECT * FROM customers WHERE customer_id = ?';
		const [result] = await this.query(sql, [id]);
		return result.length > 0 ? result[0] : null;
	}

	static async insert(customers) {
		const sql = 'INSERT INTO customers SET ?';
		const [result] = await this.query(sql, [customers]);
		return result;
	}

	static async update(id, customers) {
		const sql = 'UPDATE customers SET ? WHERE customer_id = ?';
		const [result] = await this.query(sql, [customers, id]);
		return result;
	}

	static async delete(id) {
		const sql = 'DELETE FROM customers WHERE customer_id = ?';
		const [result] = await this.query(sql, [id]);
		return result;
	}
}

export default Customers;
