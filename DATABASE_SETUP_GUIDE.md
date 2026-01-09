# 🚀 Supabase Database Setup Guide - UNITECH INDIA

## Current Status: ❌ Database is Empty (No Tables)

Your Supabase project URL is configured but the database has **zero tables**. This guide will set up everything from scratch.

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Access Supabase Dashboard

1. Open your browser and go to: **https://supabase.com/dashboard**
2. Sign in to your Supabase account
3. Select your project: **gzdudhvkohbuubgmhthe**
4. You should see the project dashboard

---

### Step 2: Open SQL Editor

1. In the left sidebar, click **"SQL Editor"**
2. Click the **"New Query"** button (green button in top right)
3. You'll see an empty SQL editor window

---

### Step 3: Create Database Schema (All Tables)

1. Open the file: `/workspaces/TechCart/supabase/00-complete-setup.sql`
2. **Copy ALL contents** of this file (Ctrl+A, Ctrl+C)
3. **Paste** into the Supabase SQL Editor
4. Click the **"Run"** button (or press Cmd/Ctrl + Enter)
5. Wait for completion (should take 2-3 seconds)

**Expected Result:**
```
Success. 
Query executed in X ms

Results showing table list:
- cart_items
- order_items
- orders
- products
- profiles
- wishlist
```

✅ **Checkpoint 1 Complete!** - All 6 tables created

---

### Step 4: Seed Products (134 UNITECH Products)

1. Click **"New Query"** again to open a fresh SQL editor
2. Open the file: `/workspaces/TechCart/supabase/seed-unitech-data.sql`
3. **Copy ALL contents** (this is a large file with 134 products)
4. **Paste** into the Supabase SQL Editor
5. Click **"Run"** button
6. Wait for completion (should take 5-10 seconds)

**Expected Result:**
```
Success. No rows returned
```

✅ **Checkpoint 2 Complete!** - 134 products inserted

---

### Step 5: Verify Data

Run this verification query in a new SQL Editor:

```sql
-- Check total products
SELECT COUNT(*) as total_products FROM products;
-- Expected: 134

-- Check products by category
SELECT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY count DESC;
-- Should show 17 categories

-- View first 5 products
SELECT id, name, category, brand, price 
FROM products 
LIMIT 5;
-- Should show UNITECH products with NULL prices
```

**Expected Category Counts:**
- Cords/Cable: 18
- Speakers: 15
- Home Theatre Systems: 14
- Tower Speakers: 13
- Audio Amplifiers: 12
- Hot Selling Products: 11
- DTH Receivers: 10
- (and 10 more categories)

✅ **Checkpoint 3 Complete!** - Data verified

---

## 🎯 What Just Happened?

### Tables Created (6 total):

1. **products** - All UNITECH products (134 items)
2. **profiles** - User account information
3. **cart_items** - Shopping cart data
4. **wishlist** - User wishlist data
5. **orders** - Order history
6. **order_items** - Individual items in each order

### Security (RLS Policies):

- ✅ Row Level Security enabled on all tables
- ✅ Users can only see their own cart/wishlist/orders
- ✅ Products are publicly readable (no login required)
- ✅ Profiles are private (users see only their own)

### Triggers & Functions:

- ✅ Auto-create profile when user signs up
- ✅ Auto-update timestamps on profile/order changes

---

## 🧪 Test the Website

### 1. Start Dev Server (if not running)
```bash
cd /workspaces/TechCart
npm run dev
```

### 2. Open in Browser
Visit: **http://localhost:8080**

### 3. Test Checklist

- [ ] **Homepage** - Should display products (not empty anymore!)
- [ ] **Categories** - Click "Tower Speakers" → Should filter products
- [ ] **Product Cards** - Should show "Price on Request"
- [ ] **Search** - Type product name → Should show results
- [ ] **Sign Up** - Create account → Should auto-create profile
- [ ] **Login** - Sign in → Should show user menu
- [ ] **Wishlist** - Click heart icon (requires login)
- [ ] **Cart** - Click "Add to Cart" (requires login)
- [ ] **Profile** - User menu → My Profile → Edit details
- [ ] **View All Products** - Click button → Shows all 134 products

---

## 🚨 Troubleshooting

### Issue: "relation 'products' does not exist"
**Solution:** Run Step 3 again (00-complete-setup.sql)

### Issue: "No products showing on homepage"
**Solution:** 
1. Check if seed SQL ran: `SELECT COUNT(*) FROM products;`
2. If returns 0, run Step 4 again (seed-unitech-data.sql)

### Issue: "Failed to fetch products"
**Solution:** 
1. Check .env file has correct Supabase credentials
2. Verify Supabase project is not paused (free tier auto-pauses after inactivity)
3. Check browser console for error messages

### Issue: "duplicate key value violates unique constraint"
**Solution:** Products already seeded. Run this to clear and re-seed:
```sql
TRUNCATE TABLE products CASCADE;
-- Then run seed-unitech-data.sql again
```

### Issue: "permission denied for table products"
**Solution:** Check RLS policies are created:
```sql
SELECT * FROM pg_policies WHERE tablename = 'products';
-- Should show "Products are publicly readable" policy
```

---

## 📊 Database Statistics

After setup is complete, you should have:

```
Tables: 6
Products: 134
Categories: 17
Brands: 1 (UNITECH)
Pricing Model: Price on Request (all prices NULL)
RLS Policies: 13
Functions: 2
Triggers: 3
```

---

## 🎉 Success!

If you've completed all steps and verification passes, your database is now:

✅ **Fully Configured** - All tables created with proper schema  
✅ **Secured** - Row Level Security policies active  
✅ **Populated** - 134 UNITECH products ready to display  
✅ **Functional** - Website can read/write data  

**Next:** Test the live website and enjoy your fully functional e-commerce platform!

---

## 📞 Need Help?

If you encounter issues:

1. Check Supabase logs: Dashboard → Logs → API/Database
2. Check browser console: F12 → Console tab
3. Verify .env file matches your Supabase project URL/keys
4. Check if Supabase project is active (not paused)

---

## 🔗 Quick Links

- **Supabase Dashboard:** https://supabase.com/dashboard/project/gzdudhvkohbuubgmhthe
- **SQL Editor:** https://supabase.com/dashboard/project/gzdudhvkohbuubgmhthe/sql/new
- **Table Editor:** https://supabase.com/dashboard/project/gzdudhvkohbuubgmhthe/editor
- **API Docs:** https://supabase.com/dashboard/project/gzdudhvkohbuubgmhthe/api

---

_Setup guide created for UNITECH INDIA e-commerce platform_
