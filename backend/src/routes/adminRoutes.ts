import { Router } from 'express';
import {
  loginAdmin,
  logoutAdmin,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/adminController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);

// Protected routes
router.get('/inquiries', authenticateAdmin, getInquiries);
router.patch('/inquiries/:id', authenticateAdmin, updateInquiryStatus);
router.delete('/inquiries/:id', authenticateAdmin, deleteInquiry);

export default router;
