import db from '../common/db.js';
import logger from '../common/logger.js';

class Users {
	constructor(users) {
		this.account_id = users.account_id;
		this.username = users.username;
		this.email = users.email;
		this.password_hash = users.password_hash;
		this.full_name = users.full_name;
		this.birth_date = users.birth_date;
		this.gender = users.gender;
		this.phone = users.phone;
		this.address = users.address;
		this.role = users.role;
		this.created_at = users.created_at;
		this.updated_at = users.updated_at;
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
		const sql = 'SELECT * FROM users LIMIT ? OFFSET ?';
		const [result] = await this.query(sql, [limit, offset]);
		return result;
	}

	static async getAllWithoutPagination() {
		const sql = 'SELECT * FROM users';
		const [result] = await this.query(sql);
		return result;
	}

	static async getCount() {
		const sql = 'SELECT COUNT(*) as total FROM users';
		const [result] = await this.query(sql);
		return result[0].total;
	}

	static async getById(id) {
		const sql = 'SELECT * FROM users WHERE account_id = ?';
		const [result] = await this.query(sql, [id]);
		return result.length > 0 ? result[0] : null;
	}

	static async insert(users) {
		const sql = 'INSERT INTO users SET ?';
		const [result] = await this.query(sql, [users]);
		return result;
	}

	static async update(id, users) {
		const sql = 'UPDATE users SET ? WHERE account_id = ?';
		const [result] = await this.query(sql, [users, id]);
		return result;
	}

	static async delete(id) {
		const sql = 'DELETE FROM users WHERE account_id = ?';
		const [result] = await this.query(sql, [id]);
		return result;
	}
}

export default Users;
