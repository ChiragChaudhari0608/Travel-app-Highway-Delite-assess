import express from 'express';

const router = express.Router();

// Validate promo code
router.post('/validate', (req, res) => {
  const { promoCode } = req.body;
  
  // Simple promo code validation
  const validPromoCodes = {
    'SAVE10': {
      type: 'percentage',
      value: 10
    },
    'FLAT100': {
      type: 'fixed',
      value: 100
    }
  };

  const promoDetails = validPromoCodes[promoCode];
  
  if (promoDetails) {
    res.json({
      valid: true,
      discount: promoDetails
    });
  } else {
    res.json({
      valid: false,
      message: 'Invalid promo code'
    });
  }
});

export default router;