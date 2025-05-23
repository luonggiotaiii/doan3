import db from '../common/db.js';
import logger from '../common/logger.js';

class Categories {
	constructor(categories) {
		this.category_id = categories.category_id;
		this.category_name = categories.category_name;
		this.description = categories.description;
		this.created_at = categories.created_at;
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
		const sql = 'SELECT * FROM categories LIMIT ? OFFSET ?';
		const [result] = await this.query(sql, [limit, offset]);
		return result;
	}

	static async getAllWithoutPagination() {
		const sql = 'SELECT * FROM categories';
		const [result] = await this.query(sql);
		return result;
	}

	static async getCount() {
		const sql = 'SELECT COUNT(*) as total FROM categories';
		const [result] = await this.query(sql);
		return result[0].total;
	}

	static async getById(id) {
		const sql = 'SELECT * FROM categories WHERE category_id = ?';
		const [result] = await this.query(sql, [id]);
		return result.length > 0 ? result[0] : null;
	}

	static async insert(categories) {
		const sql = 'INSERT INTO categories SET ?';
		const [result] = await this.query(sql, [categories]);
		return result;
	}

	static async update(id, categories) {
		const sql = 'UPDATE categories SET ? WHERE category_id = ?';
		const [result] = await this.query(sql, [categories, id]);
		return result;
	}

	static async delete(id) {
		const sql = 'DELETE FROM categories WHERE category_id = ?';
		const [result] = await this.query(sql, [id]);
		return result;
	}
}

export default Categories;
