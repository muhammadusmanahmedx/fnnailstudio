import { Resend } from 'resend';
import { generateReceiptPDF } from './generatePDF.js';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate HTML receipt for seller
 */
function generateSellerReceiptHTML(seller, orderData, sellerItems, customer) {
  const { order, address } = orderData;
  
  // Calculate seller's total
  let sellerTotal = 0;
  const itemsHTML = sellerItems.map((item, index) => {
    const itemPrice = item.product.offerPrice > 0 ? item.product.offerPrice : item.product.price;
    const itemTotal = itemPrice * item.quantity;
    sellerTotal += itemTotal;
    
    return `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 0;">
          <div style="font-weight: 500; color: #1f2937;">${item.product.name}</div>
        </td>
        <td style="padding: 12px 0; text-align: center; color: #6b7280;">${item.color || 'Default'}</td>
        <td style="padding: 12px 0; text-align: center; color: #6b7280;">${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; color: #1f2937;">Rs ${itemPrice.toFixed(2)}</td>
        <td style="padding: 12px 0; text-align: right; font-weight: 500; color: #1f2937;">Rs ${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Notification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', 'Helvetica', sans-serif; background-color: #f9fafb;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #D4A574 0%, #F6E6D6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #1D1D1E; font-size: 28px; font-weight: 600;">🎉 New Order Received!</h1>
                  <p style="margin: 8px 0 0 0; color: #1D1D1E; font-size: 14px;">You have a new order from FN Nail Studio</p>
                </td>
              </tr>
              
              <!-- Greeting -->
              <tr>
                <td style="padding: 30px 40px 20px 40px;">
                  <p style="margin: 0; font-size: 16px; color: #1f2937;">Hi <strong>${'Fatima Nazir'}</strong>,</p>
                  <p style="margin: 12px 0 0 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
                    Great news! A customer has purchased your products. Here are the order details:
                  </p>
                </td>
              </tr>
              
              <!-- Order Info -->
              <tr>
                <td style="padding: 0 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                    <tr>
                      <td>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="color: #6b7280; font-size: 14px;">Order ID:</span>
                              <strong style="color: #1f2937; font-size: 14px; margin-left: 8px;">#${order._id.toString().slice(-8).toUpperCase()}</strong>
                            </td>
                            <td style="padding: 8px 0; text-align: right;">
                              <span style="color: #6b7280; font-size: 14px;">Date:</span>
                              <strong style="color: #1f2937; font-size: 14px; margin-left: 8px;">${new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</strong>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Customer Details -->
              <tr>
                <td style="padding: 0 40px 20px 40px;">
                  <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #1f2937; border-bottom: 2px solid #D4A574; padding-bottom: 8px;">📋 Customer Details</h2>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; padding: 15px;">
                    <tr>
                      <td style="padding: 6px 0;">
                        <span style="color: #6b7280; font-size: 14px; display: inline-block; width: 100px;">Name:</span>
                        <strong style="color: #1f2937; font-size: 14px;">${customer.name || 'N/A'}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0;">
                        <span style="color: #6b7280; font-size: 14px; display: inline-block; width: 100px;">Email:</span>
                        <strong style="color: #1f2937; font-size: 14px;">${customer.email || 'N/A'}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0;">
                        <span style="color: #6b7280; font-size: 14px; display: inline-block; width: 100px;">Phone:</span>
                        <strong style="color: #1f2937; font-size: 14px;">${address.phone || 'N/A'}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0;">
                        <span style="color: #6b7280; font-size: 14px; display: inline-block; width: 100px; vertical-align: top;">Address:</span>
                        <span style="color: #1f2937; font-size: 14px; line-height: 1.5;">
                          ${address.street || ''}<br/>
                          ${address.city || ''}, ${address.state || ''} ${address.zipCode || ''}<br/>
                          ${address.country || ''}
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Order Items -->
              <tr>
                <td style="padding: 0 40px 20px 40px;">
                  <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #1f2937; border-bottom: 2px solid #D4A574; padding-bottom: 8px;">📦 Your Products in This Order</h2>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                    <thead>
                      <tr style="border-bottom: 2px solid #e5e7eb;">
                        <th style="padding: 12px 0; text-align: left; font-size: 13px; color: #6b7280; font-weight: 600;">PRODUCT</th>
                        <th style="padding: 12px 0; text-align: center; font-size: 13px; color: #6b7280; font-weight: 600;">COLOR</th>
                        <th style="padding: 12px 0; text-align: center; font-size: 13px; color: #6b7280; font-weight: 600;">QTY</th>
                        <th style="padding: 12px 0; text-align: right; font-size: 13px; color: #6b7280; font-weight: 600;">PRICE</th>
                        <th style="padding: 12px 0; text-align: right; font-size: 13px; color: #6b7280; font-weight: 600;">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHTML}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="4" style="padding: 16px 0 8px 0; text-align: right; font-size: 16px; font-weight: 600; color: #1f2937;">Your Total:</td>
                        <td style="padding: 16px 0 8px 0; text-align: right; font-size: 18px; font-weight: 700; color: #D4A574;">Rs ${sellerTotal.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </td>
              </tr>
              
              <!-- Action Button -->
              <tr>
                <td style="padding: 20px 40px 30px 40px; text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://fnnailstudio.com'}/seller/orders" 
                     style="display: inline-block; background-color: #D4A574; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 15px; font-weight: 600; box-shadow: 0 2px 4px rgba(212, 165, 116, 0.3);">
                    View Order in Dashboard
                  </a>
                  <p style="margin: 16px 0 0 0; font-size: 13px; color: #9ca3af;">
                    Please process this order as soon as possible
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">
                    Questions? Contact us at <a href="mailto:fnnailstudioofficial@gmail.com" style="color: #D4A574; text-decoration: none;">fnnailstudioofficial@gmail.com</a>
                  </p>
                  <p style="margin: 12px 0 0 0; font-size: 13px; color: #9ca3af;">
                    © ${new Date().getFullYear()} Won Solutions (wonsol.com). All rights reserved.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Send order notification email to seller
 */
export async function sendSellerOrderNotification(seller, sellerItems, orderData, customer) {
  try {
    const sellerEmail = seller.emailAddresses[0]?.emailAddress;
    
    if (!sellerEmail) {
      console.error('Seller email not found:', seller.id);
      return { success: false, error: 'Seller email not found' };
    }

    const htmlContent = generateSellerReceiptHTML(seller, orderData, sellerItems, customer);
    
    // Try to generate PDF receipt (skip if fails)
    let pdfBuffer = null;
    try {
      console.log('Generating PDF receipt...');
      pdfBuffer = await generateReceiptPDF(seller, sellerItems, orderData, customer);
      console.log('PDF generated successfully');
    } catch (pdfError) {
      console.error('Failed to generate PDF (will send email without PDF):', pdfError.message);
    }
    
    // TEMPORARY FIX: Resend free tier only allows sending to your own email
    // Send to your email but include seller's email in subject and body
    const yourEmail = 'fnnailstudioofficial@gmail.com'; // Your Resend account email
    const isTestMode = true; // Set to false once you verify a domain
    
    const orderId = orderData.order._id.toString().slice(-8).toUpperCase();
    
    const emailOptions = {
      from: 'FN Nail Studio <onboarding@resend.dev>',
      replyTo: 'fnnailstudioofficial@gmail.com',
      to: isTestMode ? [yourEmail] : [sellerEmail],
      subject: isTestMode 
        ? ` 🎉 New Order #${orderId} - You've Made a Sale!`
        : `🎉 New Order #${orderId} - You've Made a Sale!`,
      html: isTestMode 
        ? `
         
          ${htmlContent}
        `
        : htmlContent,
    };
    
    // Add PDF attachment if it was generated successfully
    if (pdfBuffer) {
      emailOptions.attachments = [
        {
          filename: `Receipt-Order-${orderId}.pdf`,
          content: pdfBuffer,
        },
      ];
    }
    
    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Error sending email to seller:', seller.id, error);
      return { success: false, error };
    }

    console.log(`Email sent successfully to ${isTestMode ? yourEmail + ' (for ' + sellerEmail + ')' : sellerEmail}`, 'Email ID:', data?.id);
    return { success: true, data };
    
  } catch (error) {
    console.error('Exception sending email:', error);
    return { success: false, error: error.message };
  }
}