import db from '../common/db.js';
import logger from '../common/logger.js';

class Inventory {
	constructor(inventory) {
		this.inventory_id = inventory.inventory_id;
		this.product_size_id = inventory.product_size_id;
		this.warehouse_id = inventory.warehouse_id;
		this.stock = inventory.stock;
		this.last_updated = inventory.last_updated;
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
		const sql = 'SELECT * FROM inventory LIMIT ? OFFSET ?';
		const [result] = await this.query(sql, [limit, offset]);
		return result;
	}

	static async getAllWithoutPagination() {
		const sql = 'SELECT * FROM inventory';
		const [result] = await this.query(sql);
		return result;
	}

	static async getCount() {
		const sql = 'SELECT COUNT(*) as total FROM inventory';
		const [result] = await this.query(sql);
		return result[0].total;
	}

	static async getById(id) {
		const sql = 'SELECT * FROM inventory WHERE inventory_id = ?';
		const [result] = await this.query(sql, [id]);
		return result.length > 0 ? result[0] : null;
	}

	static async insert(inventory) {
		const sql = 'INSERT INTO inventory SET ?';
		const [result] = await this.query(sql, [inventory]);
		return result;
	}

	static async update(id, inventory) {
		const sql = 'UPDATE inventory SET ? WHERE inventory_id = ?';
		const [result] = await this.query(sql, [inventory, id]);
		return result;
	}

	static async delete(id) {
		const sql = 'DELETE FROM inventory WHERE inventory_id = ?';
		const [result] = await this.query(sql, [id]);
		return result;
	}
}

export default Inventory;
