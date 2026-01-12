-- ========================================
-- STEP 1: Check if migration was applied
-- ========================================
-- Run this first to see if the is_admin column exists
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'is_admin';
-- If it returns nothing, run the admin migration first!

-- ========================================
-- STEP 2: Check your user in auth.users
-- ========================================
-- This will show ALL users that have signed up
SELECT id, email, created_at, email_confirmed_at
FROM auth.users
ORDER BY created_at DESC;

-- ========================================
-- STEP 3: Check existing profiles
-- ========================================
-- See if any profiles exist
SELECT id, email, full_name, is_admin, created_at
FROM public.profiles
ORDER BY created_at DESC;

-- ========================================
-- STEP 4: Create profile manually (if missing)
-- ========================================
-- REPLACE 'YOUR_USER_ID' with the actual ID from auth.users (STEP 2)
-- REPLACE 'your-email@example.com' with your actual email

-- First, uncomment and run this:
-- INSERT INTO public.profiles (id, email, full_name, is_admin)
-- VALUES (
--   'YOUR_USER_ID',  -- Replace with your actual user ID from auth.users
--   'your-email@example.com',  -- Replace with your email
--   'Your Name',  -- Replace with your name
--   true  -- This makes you an admin
-- );

-- ========================================
-- STEP 5: Or update existing profile to admin
-- ========================================
-- If profile exists but you're not admin, run this:
-- UPDATE public.profiles 
-- SET is_admin = true 
-- WHERE email = 'your-email@example.com';

-- ========================================
-- STEP 6: Verify everything is set up
-- ========================================
-- This should show you as admin = true
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.is_admin,
  p.created_at,
  u.email_confirmed_at
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
WHERE p.email = 'your-email@example.com';

-- ========================================
-- TROUBLESHOOTING
-- ========================================

-- If the trigger isn't working, you can check if it exists:
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- To recreate the trigger, run:
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
