/**
 * Test Email Sending
 * 
 * This file helps you test the email functionality locally
 * Run: node test-email.js
 */

import { sendSellerOrderNotification } from './lib/sendEmail.js';

// Mock seller data
const mockSeller = {
  id: 'user_test123',
  firstName: 'John',
  lastName: 'Doe',
  emailAddresses: [
    { emailAddress: 'your-test-email@gmail.com' } // CHANGE THIS TO YOUR EMAIL
  ],
  publicMetadata: {
    role: 'seller'
  }
};

// Mock order items
const mockItems = [
  {
    product: {
      _id: 'prod123',
      name: 'Glossy Nail Polish',
      price: 500,
      offerPrice: 450,
    },
    quantity: 2,
    color: 'Red',
    colorHex: '#FF0000'
  },
  {
    product: {
      _id: 'prod456',
      name: 'Matte Top Coat',
      price: 350,
      offerPrice: 0,
    },
    quantity: 1,
    color: 'Default',
    colorHex: '#FFFFFF'
  }
];

// Mock order data
const mockOrderData = {
  order: {
    _id: '507f1f77bcf86cd799439011',
    date: new Date(),
    amount: 1250,
  },
  address: {
    street: 'House #123, Street 45',
    city: 'Karachi',
    state: 'Sindh',
    zipCode: '75500',
    country: 'Pakistan',
    phone: '+92 300 1234567',
  }
};

// Mock customer data
const mockCustomer = {
  name: 'Sarah Ahmed',
  email: 'sarah.ahmed@example.com',
};

// Send test email
async function testEmail() {
  console.log('🚀 Sending test email...');
  console.log('To:', mockSeller.emailAddresses[0].emailAddress);
  
  const result = await sendSellerOrderNotification(
    mockSeller,
    mockItems,
    mockOrderData,
    mockCustomer
  );
  
  if (result.success) {
    console.log('✅ Email sent successfully!');
    console.log('Email ID:', result.data?.id);
  } else {
    console.error('❌ Failed to send email:', result.error);
  }
}

testEmail();
