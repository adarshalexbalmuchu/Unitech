# Payment Setup Guide for TechCart

## Current Implementation

Your checkout system is **already integrated** with Razorpay! Here's how it works:

### Payment Flow

1. **Customer adds products to cart** → Items stored in Supabase database
2. **Customer clicks "Proceed to Checkout"** → Navigates to `/checkout` page
3. **Step 1: Shipping Information** → Customer fills in delivery details
4. **Step 2: Payment Method** → Customer chooses:
   - **Razorpay** (Cards, UPI, Wallets, NetBanking)
   - **Cash on Delivery (COD)**
5. **Payment Processing**:
   - **Razorpay**: Opens modal → Customer pays → Order created in database
   - **COD**: Order created directly in database
6. **Step 3: Confirmation** → Shows order details and success message

## Razorpay Integration Details

### Files Involved
- `src/pages/Checkout.tsx` - Main checkout page with Razorpay integration
- `src/types/razorpay.d.ts` - TypeScript declarations for Razorpay

### How It Works

```typescript
// 1. Load Razorpay script
loadRazorpayScript();

// 2. When customer clicks "Pay Now", create Razorpay order
const options = {
  key: "rzp_test_YOUR_KEY_HERE", // Your Razorpay Key ID
  amount: finalTotal * 100, // Amount in paise (₹100 = 10000 paise)
  currency: "INR",
  name: "UNITECH",
  description: "Order Payment",
  handler: function (response) {
    // Payment successful! Create order in database
    createOrder(response.razorpay_payment_id);
  },
  prefill: {
    name: shippingInfo.full_name,
    email: shippingInfo.email,
    contact: shippingInfo.phone
  },
  theme: {
    color: "#0080FF"
  }
};

const razorpay = new window.Razorpay(options);
razorpay.open();
```

## Setting Up Razorpay for Production

### Step 1: Create Razorpay Account
1. Go to https://razorpay.com/
2. Sign up for a free account
3. Complete KYC verification (for receiving payments)

### Step 2: Get API Keys
1. Login to Razorpay Dashboard
2. Go to **Settings** → **API Keys**
3. Generate keys:
   - **Test Mode**: For testing (fake payments)
   - **Live Mode**: For real payments (after KYC)

### Step 3: Update Your Code

Replace `rzp_test_YOUR_KEY_HERE` in `Checkout.tsx` (around line 180):

```typescript
const options = {
  key: "rzp_live_YOUR_LIVE_KEY", // For production
  // OR
  key: "rzp_test_YOUR_TEST_KEY", // For testing
  // ... rest of options
};
```

### Step 4: Set Up Webhooks (Optional but Recommended)
1. Go to Razorpay Dashboard → **Settings** → **Webhooks**
2. Add webhook URL: `https://your-domain.com/api/razorpay-webhook`
3. Select events to track:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`

## Testing the Payment Flow

### Test Mode (Current Setup)
- Use Razorpay test cards (no real money):
  - **Card Number**: 4111 1111 1111 1111
  - **CVV**: Any 3 digits
  - **Expiry**: Any future date
  - **UPI**: success@razorpay
  - **Netbanking**: Select any bank → Success

### How to Test Right Now

1. **Sign in** to your website
2. **Add products** to cart (click "Add to Cart" button)
3. **Open cart** sidebar (click cart icon in header)
4. **Click "Proceed to Checkout"**
5. **Fill shipping details**
6. **Click "Continue to Payment"**
7. **Choose "Razorpay Payment"**
8. **Click "Pay ₹X"**
9. **Use test card** details above
10. **Complete payment** → See success message!

## Current Issue: Cart Empty on Checkout

If you're seeing "Cart is empty", it means:

### Possible Causes:
1. **Not signed in** → Products won't be added to cart
2. **Products not added** → Click "Add to Cart" button first
3. **Database connection issue** → Check Supabase connection

### How to Fix:
1. **Sign in first**: Click user icon → Sign in
2. **Add products**: Click "Add to Cart" on any product
3. **Check cart**: Click cart icon to see items
4. **Then checkout**: Click "Proceed to Checkout"

## COD (Cash on Delivery) Option

Already implemented! Customers can choose COD instead of Razorpay:
- No payment gateway involved
- Order is created directly in database
- Payment collected on delivery

## Database Schema

Orders are stored in `orders` table with:
- Order ID
- User ID
- Product details (JSON)
- Shipping information
- Payment method (`razorpay` or `cod`)
- Payment ID (from Razorpay)
- Total amount
- Status (`pending`, `paid`, `delivered`, `cancelled`)

## Next Steps

1. **Test the current setup**:
   - Sign in → Add products → Checkout → Pay with test card

2. **Get Razorpay keys**:
   - Sign up at razorpay.com
   - Get your API keys
   - Update Checkout.tsx

3. **For production**:
   - Complete KYC on Razorpay
   - Switch to live keys
   - Set up webhooks
   - Test with real small amounts first

## Support

Razorpay Documentation: https://razorpay.com/docs/
Razorpay Support: support@razorpay.com
Test Cards: https://razorpay.com/docs/payments/payments/test-card-details/

---

**Your payment system is ready to use!** Just need to add your Razorpay keys for real payments.
