import db from '../common/db.js';
import logger from '../common/logger.js';

class Order_details {
	constructor(order_details) {
		this.detail_id = order_details.detail_id;
		this.order_id = order_details.order_id;
		this.product_size_id = order_details.product_size_id;
		this.quantity = order_details.quantity;
		this.price = order_details.price;
		this.warehouse_id = order_details.warehouse_id;
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
		const sql = 'SELECT * FROM order_details LIMIT ? OFFSET ?';
		const [result] = await this.query(sql, [limit, offset]);
		return result;
	}

	static async getAllWithoutPagination() {
		const sql = 'SELECT * FROM order_details';
		const [result] = await this.query(sql);
		return result;
	}

	static async getCount() {
		const sql = 'SELECT COUNT(*) as total FROM order_details';
		const [result] = await this.query(sql);
		return result[0].total;
	}

	static async getById(id) {
		const sql = 'SELECT * FROM order_details WHERE detail_id = ?';
		const [result] = await this.query(sql, [id]);
		return result.length > 0 ? result[0] : null;
	}

	static async insert(order_details) {
		const sql = 'INSERT INTO order_details SET ?';
		const [result] = await this.query(sql, [order_details]);
		return result;
	}

	static async update(id, order_details) {
		const sql = 'UPDATE order_details SET ? WHERE detail_id = ?';
		const [result] = await this.query(sql, [order_details, id]);
		return result;
	}

	static async delete(id) {
		const sql = 'DELETE FROM order_details WHERE detail_id = ?';
		const [result] = await this.query(sql, [id]);
		return result;
	}
}

export default Order_details;
