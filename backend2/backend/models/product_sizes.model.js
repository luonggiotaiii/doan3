import db from '../common/db.js';
import logger from '../common/logger.js';

class Product_sizes {
	constructor(product_sizes) {
		this.product_size_id = product_sizes.product_size_id;
		this.product_id = product_sizes.product_id;
		this.size_id = product_sizes.size_id;
		this.created_at = product_sizes.created_at;
		this.updated_at = product_sizes.updated_at;
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
		const sql = 'SELECT * FROM product_sizes LIMIT ? OFFSET ?';
		const [result] = await this.query(sql, [limit, offset]);
		return result;
	}

	static async getAllWithoutPagination() {
		const sql = 'SELECT * FROM product_sizes';
		const [result] = await this.query(sql);
		return result;
	}

	static async getCount() {
		const sql = 'SELECT COUNT(*) as total FROM product_sizes';
		const [result] = await this.query(sql);
		return result[0].total;
	}

	static async getById(id) {
		const sql = 'SELECT * FROM product_sizes WHERE product_size_id = ?';
		const [result] = await this.query(sql, [id]);
		return result.length > 0 ? result[0] : null;
	}

	static async insert(product_sizes) {
		const sql = 'INSERT INTO product_sizes SET ?';
		const [result] = await this.query(sql, [product_sizes]);
		return result;
	}

	static async update(id, product_sizes) {
		const sql = 'UPDATE product_sizes SET ? WHERE product_size_id = ?';
		const [result] = await this.query(sql, [product_sizes, id]);
		return result;
	}

	static async delete(id) {
		const sql = 'DELETE FROM product_sizes WHERE product_size_id = ?';
		const [result] = await this.query(sql, [id]);
		return result;
	}
}

export default Product_sizes;
