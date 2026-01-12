# TechCart Admin Setup Guide

## ✅ Auth Page is Working Now!

You successfully created an account, but the profile isn't showing in Supabase. Let's fix that.

---

## Step-by-Step Setup

### 1. Go to Supabase SQL Editor

1. Open your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar

### 2. Apply Admin Migration (if not done)

Copy and paste this entire SQL block and click **Run**:

```sql
-- Add is_admin column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Drop existing product policies
DROP POLICY IF EXISTS "Products are publicly readable" ON public.products;

-- Create new product policies
CREATE POLICY "Products are publicly readable"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );
```

### 3. Find Your User ID

Run this query:

```sql
SELECT id, email, created_at, email_confirmed_at
FROM auth.users
ORDER BY created_at DESC;
```

Copy your **user ID** (the UUID next to your email).

### 4. Check if Profile Exists

Run this:

```sql
SELECT id, email, full_name, is_admin, created_at
FROM public.profiles;
```

**If you see your profile:** Skip to Step 6

**If you DON'T see your profile:** Continue to Step 5

### 5. Create Your Profile Manually

Replace `YOUR_USER_ID` and `your-email@example.com` with your actual values from Step 3:

```sql
INSERT INTO public.profiles (id, email, full_name, is_admin)
VALUES (
  'YOUR_USER_ID',  -- Replace with your actual user ID
  'your-email@example.com',  -- Replace with your email
  'Your Name',  -- Replace with your name
  true  -- Makes you an admin
);
```

### 6. Set Yourself as Admin (if profile already exists)

If your profile exists but `is_admin` is false:

```sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
```

### 7. Verify Setup

Run this to confirm everything is correct:

```sql
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.is_admin,
  p.created_at
FROM public.profiles p
WHERE p.is_admin = true;
```

You should see your profile with `is_admin = true`.

---

## 8. Access Admin Panel

1. Go to: https://adarshalexbalmuchu.github.io/TechCart/auth
2. **Log in** with your credentials
3. Navigate to: https://adarshalexbalmuchu.github.io/TechCart/admin
4. You should see the Product Management page!

---

## Troubleshooting

### "Profile not found" error

The trigger that auto-creates profiles might not be working. Use Step 5 to create your profile manually.

### Can't access /admin page

1. Make sure you're logged in
2. Verify `is_admin = true` in your profile
3. Clear browser cache and try again
4. Check browser console (F12) for errors

### Trigger not working for new users

To recreate the profile trigger, run this in Supabase:

```sql
-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    false  -- Default users are not admin
  );
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## What You Can Do in Admin Panel

- ✅ Add new products with all details
- ✅ Edit existing products  
- ✅ Delete products
- ✅ Search and filter products
- ✅ Set featured/trending status
- ✅ Manage stock and pricing
- ✅ Upload product images (via URL)

---

## Need Help?

1. Check that you're on the latest deployment
2. Verify Supabase credentials in `.env` file
3. Make sure migration was applied
4. Confirm you're marked as admin in profiles table
5. Check browser console for specific error messages

**Common emails to check:**
- Confirmation email from Supabase (check spam)
- Magic link emails (if using magic link auth)

