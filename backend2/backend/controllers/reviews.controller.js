import { getAllReviews, getAllReviewsWithoutPagination, getReviewsById, createReviews, updateReviews, deleteReviews } from '../services/reviews.service.js';
import logger from '../common/logger.js';

export const getAll = async (req, res) => {
	const { limit = 10, page = 1 } = req.query;
	const offset = (page - 1) * limit;
	try {
		const { data, total } = await getAllReviews({ limit: parseInt(limit), offset: parseInt(offset) });
		res.status(200).json({ data, meta: { limit: parseInt(limit), page: parseInt(page), total } });
	} catch (error) {
		logger.error(`Get all reviews failed: ${error.message}`, { query: req.query, stack: error.stack });
		if (error.message === 'Database error: ER_NO_SUCH_TABLE') {
			res.status(400).json({ message: 'Table reviews does not exist' });
		} else if (error.message.includes('Database error')) {
			res.status(500).json({ message: 'Database error occurred' });
		} else {
			res.status(500).json({ message: `Error fetching reviews: ${error.message}` });
		}
	}
};

export const getAllWithoutPagination = async (req, res) => {
	try {
		const data = await getAllReviewsWithoutPagination();
		res.status(200).json({ data });
	} catch (error) {
		logger.error(`Get all reviews without pagination failed: ${error.message}`, { stack: error.stack });
		if (error.message === 'Database error: ER_NO_SUCH_TABLE') {
			res.status(400).json({ message: 'Table reviews does not exist' });
		} else if (error.message.includes('Database error')) {
			res.status(500).json({ message: 'Database error occurred' });
		} else {
			res.status(500).json({ message: `Error fetching reviews: ${error.message}` });
		}
	}
};

export const getById = async (req, res) => {
	const { id } = req.params;
	try {
		const data = await getReviewsById(id);
		if (!data) return res.status(404).json({ message: `reviews not found with ID: ${id}` });
		res.status(200).json({ data });
	} catch (error) {
		logger.error(`Get reviews by ID failed: ${error.message}`, { id, stack: error.stack });
		res.status(500).json({ message: `Error fetching reviews: ${error.message}` });
	}
};

export const insert = async (req, res) => {
	const reviews = req.body;
	try {
		const data = await createReviews(reviews);
		res.status(201).json({ data });
	} catch (error) {
		logger.error(`Insert reviews failed: ${error.message}`, { data: reviews, stack: error.stack });
		if (error.code === 'ER_DUP_ENTRY') {
			res.status(409).json({ message: `reviews already exists` });
		} else if (error.message === 'Data cannot be empty') {
			res.status(400).json({ message: 'Data cannot be empty' });
		} else {
			res.status(400).json({ message: `Error inserting reviews: ${error.message}` });
		}
	}
};

export const update = async (req, res) => {
	const { id } = req.params;
	const reviews = req.body;
	try {
		const success = await updateReviews(id, reviews);
		if (!success) return res.status(404).json({ message: `reviews not found with ID: ${id}` });
		res.status(200).json({ message: 'Updated successfully' });
	} catch (error) {
		logger.error(`Update reviews failed: ${error.message}`, { id, data: reviews, stack: error.stack });
		if (error.message === 'ID is required') {
			res.status(400).json({ message: 'ID is required' });
		} else if (error.message === 'Update data cannot be empty') {
			res.status(400).json({ message: 'Update data cannot be empty' });
		} else {
			res.status(400).json({ message: `Error updating reviews: ${error.message}` });
		}
	}
};

export const deletereviews = async (req, res) => {
	const { id } = req.params;
	try {
		const success = await deleteReviews(id);
		if (!success) return res.status(404).json({ message: `reviews not found with ID: ${id}` });
		res.status(200).json({ message: 'Deleted successfully' });
	} catch (error) {
		logger.error(`Delete reviews failed: ${error.message}`, { id, stack: error.stack });
		if (error.message === 'ID is required') {
			res.status(400).json({ message: 'ID is required' });
		} else {
			res.status(400).json({ message: `Error deleting reviews: ${error.message}` });
		}
	}
};
