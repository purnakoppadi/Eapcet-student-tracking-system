const express = require('express');
const { getDashboardAnalytics, getBranchAnalytics, getProgressAnalytics } = require('../controllers/analyticsController');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/dashboard', asyncHandler(getDashboardAnalytics));
router.get('/branches', asyncHandler(getBranchAnalytics));
router.get('/progress', asyncHandler(getProgressAnalytics));

module.exports = router;
