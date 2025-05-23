import db from '../common/db.js';
import logger from '../common/logger.js';

class Payment_methods {
	constructor(payment_methods) {
		this.method_id = payment_methods.method_id;
		this.method_name = payment_methods.method_name;
		this.description = payment_methods.description;
		this.is_active = payment_methods.is_active;
		this.created_at = payment_methods.created_at;
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
		const sql = 'SELECT * FROM payment_methods LIMIT ? OFFSET ?';
		const [result] = await this.query(sql, [limit, offset]);
		return result;
	}

	static async getAllWithoutPagination() {
		const sql = 'SELECT * FROM payment_methods';
		const [result] = await this.query(sql);
		return result;
	}

	static async getCount() {
		const sql = 'SELECT COUNT(*) as total FROM payment_methods';
		const [result] = await this.query(sql);
		return result[0].total;
	}

	static async getById(id) {
		const sql = 'SELECT * FROM payment_methods WHERE method_id = ?';
		const [result] = await this.query(sql, [id]);
		return result.length > 0 ? result[0] : null;
	}

	static async insert(payment_methods) {
		const sql = 'INSERT INTO payment_methods SET ?';
		const [result] = await this.query(sql, [payment_methods]);
		return result;
	}

	static async update(id, payment_methods) {
		const sql = 'UPDATE payment_methods SET ? WHERE method_id = ?';
		const [result] = await this.query(sql, [payment_methods, id]);
		return result;
	}

	static async delete(id) {
		const sql = 'DELETE FROM payment_methods WHERE method_id = ?';
		const [result] = await this.query(sql, [id]);
		return result;
	}
}

export default Payment_methods;
