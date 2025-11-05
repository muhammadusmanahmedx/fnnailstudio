# Email Notifications Setup Guide

## ✅ What's Been Implemented

### 1. **Email Service Integration**
- ✅ Installed Resend package
- ✅ Created email utility (`lib/sendEmail.js`)
- ✅ Updated order creation API to send emails

### 2. **Features Included**
- ✅ Professional HTML email template
- ✅ Customer details (name, email, phone, address)
- ✅ Order receipt with product details
- ✅ Color information for each product
- ✅ Seller-specific totals
- ✅ Order ID and date
- ✅ Link to seller dashboard
- ✅ Multiple sellers support (each seller only sees their products)

---

## 🚀 Setup Steps

### Step 1: Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email
4. Go to **API Keys** section
5. Click **Create API Key**
6. Copy the API key (starts with `re_`)

### Step 2: Update Environment Variables

Open `.env` file and replace:
```properties
RESEND_API_KEY=re_your_api_key_here
```

With your actual API key:
```properties
RESEND_API_KEY=re_abc123xyz...
```

### Step 3: Verify Email Domain (Optional but Recommended)

**For Testing (Free Tier):**
- You can send emails from `onboarding@resend.dev`
- Update `lib/sendEmail.js` line 169:
  ```javascript
  from: 'FN Nail Studio <onboarding@resend.dev>',
  ```

**For Production:**
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Add your domain (e.g., `fnnailstudio.com`)
4. Follow DNS verification steps
5. Once verified, use:
   ```javascript
   from: 'FN Nail Studio <orders@fnnailstudio.com>',
   ```

### Step 4: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Place a test order through your application

3. Check:
   - Terminal logs for "Sent X seller notification emails"
   - Seller's email inbox for the notification
   - Resend dashboard for email delivery status

---

## 📧 Email Template Features

The email includes:

### **Header Section**
- 🎉 Eye-catching greeting
- Professional gradient background

### **Order Information**
- Order ID (last 8 characters, uppercase)
- Order date

### **Customer Details Section**
- Customer name
- Email address
- Phone number
- Complete delivery address

### **Products Section**
- Product name
- Selected color (if applicable)
- Quantity ordered
- Price per item
- Total per item
- **Seller's total amount** (only for their products)

### **Call-to-Action**
- Button linking to seller dashboard
- Professional styling

### **Footer**
- Support contact information
- Copyright notice

---

## 🎨 Customization Options

### Change Email Styling

Edit `lib/sendEmail.js` to customize:

**Colors:**
```javascript
// Change primary color (currently #D4A574)
style="background-color: #YOUR_COLOR;"
```

**Brand Logo:**
Add logo to header section:
```html
<img src="https://your-domain.com/logo.png" alt="Logo" style="height: 40px;" />
```

**Button Text:**
Line 159 in `lib/sendEmail.js`

**Support Email:**
Line 166 in `lib/sendEmail.js`

---

## 🔧 Troubleshooting

### Emails Not Sending

**Check 1: API Key**
```bash
# Verify environment variable is set
echo $RESEND_API_KEY
```

**Check 2: Terminal Logs**
Look for:
- "Sent X seller notification emails"
- Any error messages starting with "Error sending email"

**Check 3: Resend Dashboard**
- Go to **Logs** section
- Check email status (sent, delivered, bounced)

**Check 4: Spam Folder**
- Check seller's spam/junk folder
- Mark as "Not Spam" if found there

### Email Formatting Issues

**Check 1: HTML Rendering**
- Test email in different clients (Gmail, Outlook, etc.)

**Check 2: Missing Data**
- Verify customer address is complete
- Check product details are loaded correctly

---

## 📊 Free Tier Limits

**Resend Free Tier:**
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ Full API access

**When to Upgrade:**
- If you exceed 100 orders/day
- If you need custom domain
- If you need priority support

**Pricing:**
- Free: $0/month (100 emails/day)
- Starter: $20/month (50,000 emails)
- Pro: Custom pricing

---

## 🔐 Security Notes

1. **Never commit `.env` file to Git**
   - Already in `.gitignore`
   - Keep API keys secret

2. **Use Environment Variables**
   - All sensitive data in `.env`
   - Deploy to Vercel: Add env vars in dashboard

3. **Email Sending is Non-Blocking**
   - Order completes even if email fails
   - Errors are logged but don't affect order

---

## 🚀 Deployment to Vercel

### Add Environment Variables

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   RESEND_API_KEY = re_your_api_key_here
   NEXT_PUBLIC_SITE_URL = https://your-domain.vercel.app
   ```
5. Redeploy your application

---

## 📝 Testing Checklist

- [ ] Resend API key added to `.env`
- [ ] Server restarted after adding API key
- [ ] Test order placed successfully
- [ ] Email received in seller's inbox
- [ ] Customer details visible in email
- [ ] Product list shows correct items
- [ ] Colors displayed correctly
- [ ] Total amount calculated correctly
- [ ] Dashboard link works
- [ ] Email looks good on mobile
- [ ] Multiple sellers receive separate emails

---

## 🎯 Next Steps (Optional Enhancements)

1. **Customer Order Confirmation Email**
   - Send receipt to customer as well
   - Use similar template

2. **Order Status Update Emails**
   - Notify seller when order status changes
   - Notify customer on shipping

3. **Email Templates**
   - Create reusable email components
   - Use React Email for better templates

4. **Analytics**
   - Track email open rates
   - Monitor delivery success

---

## 💡 Support

If you encounter any issues:
1. Check terminal logs for errors
2. Verify API key is correct
3. Check Resend dashboard for email status
4. Review this guide for troubleshooting steps

**Resend Documentation:** https://resend.com/docs

---

## ✨ Implementation Summary

**Files Modified:**
- ✅ `lib/sendEmail.js` - Email utility and HTML template
- ✅ `app/api/order/create/route.js` - Order creation with email sending
- ✅ `.env` - Environment variables for API key

**How It Works:**
1. Customer places order
2. Order saved to database
3. System identifies all sellers in the order
4. Groups products by seller
5. Sends personalized email to each seller
6. Each email contains only that seller's products
7. Customer details included for fulfillment
8. Order completes successfully regardless of email status

---

**🎉 Your email notification system is ready to use!**
