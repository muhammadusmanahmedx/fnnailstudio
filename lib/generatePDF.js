import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import fs from 'fs';
import path from 'path';

/**
 * Generate PDF receipt for seller
 */
export async function generateReceiptPDF(seller, sellerItems, orderData, customer) {
  const { order, address } = orderData;
  
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calculate seller's total
    let sellerTotal = 0;
    const tableData = sellerItems.map(item => {
      const itemPrice = item.product.offerPrice > 0 ? item.product.offerPrice : item.product.price;
      const itemTotal = itemPrice * item.quantity;
      sellerTotal += itemTotal;
      
      return [
        `${item.product.name}`,
        item.color || 'Default',
        item.quantity.toString(),
        `Rs ${itemPrice.toFixed(2)}`,
        `Rs ${itemTotal.toFixed(2)}`
      ];
    });

    const orderId = order._id.toString().slice(-8).toUpperCase();
    let yPos = 20;

    // Logo - Add image
    try {
      const logoPath = path.join(process.cwd(), 'public', 'fallback.png');
      const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
      const logoDataUrl = `data:image/png;base64,${logoBase64}`;
      
      // Add logo centered at top
      const logoWidth = 60; // Width in mm
      const logoHeight = 18; // Height in mm (maintain aspect ratio)
      const logoX = (210 - logoWidth) / 2; // Center horizontally on A4 page (210mm wide)
      
      doc.addImage(logoDataUrl, 'PNG', logoX, yPos, logoWidth, logoHeight);
      yPos += logoHeight + 5;
    } catch (e) {
      console.error('Failed to load logo, using text fallback:', e.message);
      // Fallback to text if image fails
      doc.setFontSize(24);
      doc.setTextColor(190, 24, 93);
      doc.text('FN NAIL STUDIO', 105, yPos, { align: 'center' });
      yPos += 8;
    }
    
    doc.setFontSize(10);
    doc.setTextColor(102, 102, 102);
    doc.text('Thank you for shopping with us!', 105, yPos, { align: 'center' });
    
    yPos += 5;
    doc.setFontSize(9);
    doc.text('Visit us at: fnnailstudio.com', 105, yPos, { align: 'center' });
    
    yPos += 8;
    doc.setDrawColor(251, 207, 232);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    
    yPos += 10;

    // Receipt Title
    doc.setFontSize(20);
    doc.setTextColor(190, 24, 93);
    doc.text('ORDER RECEIPT', 105, yPos, { align: 'center' });
    
    yPos += 10;

    // Order Info
    doc.setFontSize(10);
    doc.setTextColor(51, 51, 51);
    doc.text(`Order ID: #${orderId}`, 20, yPos);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 105, yPos, { align: 'center' });
    doc.text(`Status: ${order.status === 'out-for-delivery' ? 'Out for Delivery' : (order.status || 'pending').toUpperCase()}`, 190, yPos, { align: 'right' });
    
    yPos += 10;

    // Customer & Delivery Address (Seller Information removed)
    doc.setDrawColor(229, 231, 235);
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(20, yPos, 170, 30, 2, 2, 'FD');
    
    doc.setFontSize(11);
    doc.setTextColor(31, 41, 55);
    doc.setFont(undefined, 'bold');
    doc.text('Customer & Delivery Address:', 25, yPos + 7);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(55, 65, 81);
    doc.text(`${address.fullName || customer.name || 'N/A'}`, 25, yPos + 13);
    doc.text(`${address.street || address.area || 'N/A'}`, 25, yPos + 17);
    doc.text(`${address.city || 'N/A'}, ${address.state || ''} ${address.zipCode || address.pinCode || ''}`, 25, yPos + 21);
    doc.text(`Phone: ${address.phone || address.phoneNumber || 'N/A'}  |  Email: ${customer.email || 'N/A'}`, 25, yPos + 25);
    
    yPos += 35;

    // Order Items Table
    doc.setFontSize(11);
    doc.setTextColor(31, 41, 55);
    doc.setFont(undefined, 'bold');
    doc.text('Order Items:', 20, yPos);
    
    yPos += 5;

    autoTable(doc, {
      startY: yPos,
      head: [['Product', 'Color', 'Qty', 'Price', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [251, 207, 232],
        textColor: [190, 24, 93],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'left'
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [31, 41, 55]
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 30 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 30, halign: 'right' }
      },
      margin: { left: 20, right: 20 }
    });

    yPos = doc.lastAutoTable.finalY + 10;

    // Summary
    doc.setDrawColor(209, 213, 219);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    
    yPos += 7;

    const summaryX = 130;
    doc.setFontSize(10);
    doc.setTextColor(102, 102, 102);
    doc.setFont(undefined, 'normal');
    doc.text('Subtotal:', summaryX, yPos);
    doc.text(`Rs ${sellerTotal.toFixed(2)}`, 190, yPos, { align: 'right' });
    
    yPos += 6;
    doc.text('Delivery Charges:', summaryX, yPos);
    doc.text('Rs 0', 190, yPos, { align: 'right' });
    
    yPos += 8;
    doc.setDrawColor(251, 207, 232);
    doc.setLineWidth(0.5);
    doc.line(summaryX, yPos, 190, yPos);
    
    yPos += 7;
    doc.setFontSize(13);
    doc.setTextColor(190, 24, 93);
    doc.setFont(undefined, 'bold');
    doc.text('Total Amount:', summaryX, yPos);
    doc.text(`Rs ${sellerTotal.toFixed(2)}`, 190, yPos, { align: 'right' });
    
    yPos += 10;

    // Payment Method
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.setFont(undefined, 'normal');
    doc.text(`Payment Method: Cash on Delivery (COD)        Payment Status: ${order.status === 'pending' ? 'Pending' : 'Confirmed'}`, 20, yPos);
    
    yPos += 10;

    // Footer
    doc.setDrawColor(251, 207, 232);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    
    yPos += 8;
    doc.setFontSize(15);
    doc.setTextColor(190, 24, 93);
    doc.setFont(undefined, 'bold');
    doc.text('We appreciate you and hope you enjoy your purchase', 105, yPos, { align: 'center' });
    
    yPos += 8;
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.setFont(undefined, 'normal');
    doc.text('This is a computer-generated receipt and does not require a signature.', 105, yPos, { align: 'center' });
    
    yPos += 5;
    doc.text(`© ${new Date().getFullYear()} Won Solutions (wonsol.com). All rights reserved.`, 105, yPos, { align: 'center' });

    // Return PDF as buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    return pdfBuffer;

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
