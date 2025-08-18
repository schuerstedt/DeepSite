// Download utilities for DeepSite - Client-side only
import React from 'react';

// Simple PDF generation as a fallback
export const downloadAsPdfSimple = async (iframeRef: React.RefObject<HTMLIFrameElement>, filename: string = 'website.pdf') => {
  if (!iframeRef.current) {
    throw new Error('Preview not available');
  }

  if (typeof window === 'undefined') {
    throw new Error('PDF download is only available on the client side');
  }

  const iframe = iframeRef.current;
  
  try {
    // Dynamic imports
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]);

    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDocument?.body) {
      throw new Error('Cannot access iframe content');
    }

    // Simple approach: capture visible area only
    const canvas = await html2canvas(iframe, {
      allowTaint: true,
      useCORS: true,
      scale: 1,
      backgroundColor: '#ffffff',
      logging: false
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.8);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Simple fit to page
    const pdfWidth = 210;
    const pdfHeight = 297;
    const margin = 10;
    
    const availableWidth = pdfWidth - (margin * 2);
    const availableHeight = pdfHeight - (margin * 2);
    
    const imgAspectRatio = canvas.width / canvas.height;
    let imgWidth = availableWidth;
    let imgHeight = availableWidth / imgAspectRatio;
    
    if (imgHeight > availableHeight) {
      imgHeight = availableHeight;
      imgWidth = availableHeight * imgAspectRatio;
    }
    
    const x = (pdfWidth - imgWidth) / 2;
    const y = margin;
    
    pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
    pdf.save(filename);

  } catch (error) {
    console.error('Simple PDF generation error:', error);
    throw new Error('Failed to generate PDF. The page might be too complex or still loading.');
  }
};

// Text-based PDF as ultimate fallback
export const downloadAsPdfText = async (iframeRef: React.RefObject<HTMLIFrameElement>, filename: string = 'website.pdf') => {
  if (!iframeRef.current) {
    throw new Error('Preview not available');
  }

  if (typeof window === 'undefined') {
    throw new Error('PDF download is only available on the client side');
  }

  try {
    const { default: jsPDF } = await import('jspdf');

    const iframe = iframeRef.current;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (!iframeDocument?.body) {
      throw new Error('Cannot access iframe content');
    }

    // Extract text content
    const textContent = iframeDocument.body.innerText || 'Website content';
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const lineHeight = 7;
    const maxWidth = pageWidth - (margin * 2);
    
    // Add title
    pdf.setFontSize(16);
    pdf.text('Website Export', margin, margin);
    
    // Add content
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(textContent, maxWidth);
    let currentY = margin + 15;
    
    for (const line of lines) {
      if (currentY > pageHeight - margin) {
        pdf.addPage();
        currentY = margin;
      }
      pdf.text(line, margin, currentY);
      currentY += lineHeight;
    }
    
    pdf.save(filename);

  } catch (error) {
    console.error('Text PDF generation error:', error);
    throw new Error('Failed to generate text-based PDF.');
  }
};

export const downloadHtmlFile = (html: string, filename: string = 'website.html') => {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadAsPdf = async (iframeRef: React.RefObject<HTMLIFrameElement>, filename: string = 'website.pdf') => {
  if (!iframeRef.current) {
    throw new Error('Preview not available');
  }

  // Check if we're in the browser
  if (typeof window === 'undefined') {
    throw new Error('PDF download is only available on the client side');
  }

  const iframe = iframeRef.current;
  
  try {
    // Dynamic imports for client-side only libraries
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]);

    // Wait for iframe to load completely with timeout
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Iframe loading timeout'));
      }, 10000); // 10 second timeout

      if (iframe.contentDocument?.readyState === 'complete') {
        clearTimeout(timeout);
        resolve(void 0);
      } else {
        iframe.onload = () => {
          clearTimeout(timeout);
          resolve(void 0);
        };
      }
    });

    // Additional wait for content to fully render
    await new Promise(resolve => setTimeout(resolve, 1000));

    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDocument) {
      throw new Error('Cannot access iframe content - check CORS settings');
    }

    const body = iframeDocument.body;
    
    if (!body || body.innerHTML.trim() === '') {
      throw new Error('No content found in preview - please generate some content first');
    }

    // Get iframe dimensions
    const iframeRect = iframe.getBoundingClientRect();
    const contentWidth = Math.max(body.scrollWidth, body.offsetWidth, iframeDocument.documentElement.scrollWidth);
    const contentHeight = Math.max(body.scrollHeight, body.offsetHeight, iframeDocument.documentElement.scrollHeight);

    // Capture the iframe content with html2canvas
    const canvas = await html2canvas(body, {
      allowTaint: true,
      useCORS: true,
      scale: 2, // High quality
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
      width: contentWidth,
      height: contentHeight,
      logging: false,
      onclone: (clonedDoc) => {
        // Ensure all styles are preserved in the clone
        const clonedBody = clonedDoc.body;
        if (clonedBody) {
          clonedBody.style.transform = 'none';
          clonedBody.style.transformOrigin = 'top left';
          clonedBody.style.overflow = 'visible';
        }
      }
    });

    // Create PDF using jsPDF
    const imgData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Calculate PDF dimensions (A4 format)
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const ratio = canvas.width / canvas.height;
    
    let imgWidth = pdfWidth - 20; // Margins
    let imgHeight = imgWidth / ratio;
    
    // If image is too tall, scale it down
    if (imgHeight > pdfHeight - 20) {
      imgHeight = pdfHeight - 20;
      imgWidth = imgHeight * ratio;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const xPos = (pdfWidth - imgWidth) / 2;
    const yPos = 10;

    pdf.addImage(imgData, 'JPEG', xPos, yPos, imgWidth, imgHeight);
    
    // If content is very long, add multiple pages
    if (imgHeight > pdfHeight - 30) {
      const pageHeight = pdfHeight - 20;
      let remainingHeight = imgHeight;
      let currentY = 0;
      let pageNum = 1;

      while (remainingHeight > 0) {
        if (pageNum > 1) {
          pdf.addPage();
        }
        
        const currentPageHeight = Math.min(pageHeight, remainingHeight);
        const sourceY = currentY * (canvas.height / imgHeight);
        const sourceHeight = currentPageHeight * (canvas.height / imgHeight);
        
        // Create a temporary canvas for this page segment
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = sourceHeight;
        const tempCtx = tempCanvas.getContext('2d');
        
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
          const tempImgData = tempCanvas.toDataURL('image/jpeg', 0.8);
          
          if (pageNum === 1) {
            pdf.addImage(tempImgData, 'JPEG', xPos, yPos, imgWidth, currentPageHeight);
          } else {
            pdf.addImage(tempImgData, 'JPEG', xPos, 10, imgWidth, currentPageHeight);
          }
        }
        
        remainingHeight -= pageHeight;
        currentY += pageHeight;
        pageNum++;
      }
    }

    // Download the PDF
    pdf.save(filename);

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Try the simple fallback approach
    try {
      console.log('Attempting simple PDF generation as fallback...');
      await downloadAsPdfSimple(iframeRef, filename);
      return; // Success with fallback
    } catch (fallbackError) {
      console.error('Fallback PDF generation also failed:', fallbackError);
      
      // Try text-based PDF as final fallback
      try {
        console.log('Attempting text-based PDF as final fallback...');
        await downloadAsPdfText(iframeRef, filename);
        return; // Success with text fallback
      } catch (textError) {
        console.error('Text PDF generation also failed:', textError);
      }
    }
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        throw new Error('Preview is taking too long to load. Please wait and try again.');
      } else if (error.message.includes('CORS')) {
        throw new Error('Cannot access preview content. Please refresh the page and try again.');
      } else if (error.message.includes('No content')) {
        throw new Error('Preview is empty. Please generate some content first.');
      } else if (error.message.includes('html2canvas')) {
        throw new Error('Failed to capture page content. Please try the image export instead.');
      }
    }
    throw new Error('Failed to generate PDF. Please try again or use a different export format.');
  }
};

export const downloadAsImage = async (iframeRef: React.RefObject<HTMLIFrameElement>, filename: string = 'website-screenshot.png') => {
  if (!iframeRef.current) {
    throw new Error('Preview not available');
  }

  // Check if we're in the browser
  if (typeof window === 'undefined') {
    throw new Error('Image download is only available on the client side');
  }

  const iframe = iframeRef.current;
  
  try {
    // Dynamic import for client-side only libraries
    const { default: html2canvas } = await import('html2canvas');

    // Wait for iframe to load completely
    await new Promise((resolve) => {
      if (iframe.contentDocument?.readyState === 'complete') {
        resolve(void 0);
      } else {
        iframe.onload = () => resolve(void 0);
      }
    });

    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDocument) {
      throw new Error('Cannot access iframe content');
    }

    const body = iframeDocument.body;
    if (!body) {
      throw new Error('No content to capture');
    }

    // Get the full height of the content
    const scrollHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      iframeDocument.documentElement.clientHeight,
      iframeDocument.documentElement.scrollHeight,
      iframeDocument.documentElement.offsetHeight
    );

    // Set iframe height to full content height temporarily
    const originalHeight = iframe.style.height;
    iframe.style.height = `${scrollHeight}px`;

    // Wait a bit for reflow
    await new Promise(resolve => setTimeout(resolve, 100));

    // Capture the full iframe content
    const canvas = await html2canvas(iframe, {
      allowTaint: true,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: iframe.offsetWidth,
      windowHeight: scrollHeight,
      scale: 1,
      backgroundColor: '#ffffff'
    });

    // Restore original height
    iframe.style.height = originalHeight;

    // Download the image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');

  } catch (error) {
    console.error('Error capturing screenshot:', error);
    throw error;
  }
};

export const downloadAsFullPageImage = async (iframeRef: React.RefObject<HTMLIFrameElement>, filename: string = 'website-fullpage.png') => {
  if (!iframeRef.current) {
    throw new Error('Preview not available');
  }

  // Check if we're in the browser
  if (typeof window === 'undefined') {
    throw new Error('Image download is only available on the client side');
  }

  const iframe = iframeRef.current;
  
  try {
    // Dynamic import for client-side only libraries
    const { default: html2canvas } = await import('html2canvas');

    // Wait for iframe to load completely
    await new Promise((resolve) => {
      if (iframe.contentDocument?.readyState === 'complete') {
        resolve(void 0);
      } else {
        iframe.onload = () => resolve(void 0);
      }
    });

    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDocument) {
      throw new Error('Cannot access iframe content');
    }

    // Alternative approach: capture iframe content directly
    const iframeWindow = iframe.contentWindow;
    if (iframeWindow) {
      // Temporarily remove iframe borders and padding
      const originalStyle = iframe.style.cssText;
      iframe.style.border = 'none';
      iframe.style.padding = '0';
      iframe.style.margin = '0';

      // Get the body element to capture
      const body = iframeDocument.body;
      const documentElement = iframeDocument.documentElement;

      // Capture using html2canvas on the iframe's document
      const canvas = await html2canvas(body, {
        allowTaint: true,
        useCORS: true,
        scale: 2, // Higher quality
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        windowWidth: documentElement.scrollWidth,
        windowHeight: documentElement.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all styles are preserved in the clone
          const clonedBody = clonedDoc.body;
          if (clonedBody) {
            clonedBody.style.transform = 'none';
            clonedBody.style.transformOrigin = 'top left';
          }
        }
      });

      // Restore original iframe style
      iframe.style.cssText = originalStyle;

      // Download the image
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    }

  } catch (error) {
    console.error('Error capturing full page screenshot:', error);
    throw error;
  }
};
