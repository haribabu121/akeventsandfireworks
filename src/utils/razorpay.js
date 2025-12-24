export const loadRazorpay = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      console.log('Razorpay already loaded');
      resolve(window.Razorpay);
      return;
    }

    console.log('Loading Razorpay script...');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      if (window.Razorpay) {
        resolve(window.Razorpay);
      } else {
        reject(new Error('Razorpay SDK not available after loading'));
      }
    };
    script.onerror = (error) => {
      console.error('Failed to load Razorpay script:', error);
      reject(new Error('Failed to load Razorpay SDK'));
    };
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount) => {
  console.log('Creating Razorpay order for amount:', amount);
  try {
    // In a real app, this would be an API call to your backend
    const order = {
      id: `order_${Math.random().toString(36).substr(2, 9)}`,
      currency: 'INR',
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      receipt: `rcpt_${Math.random().toString(36).substr(2, 9)}`,
      status: 'created',
      created_at: Math.floor(Date.now() / 1000)
    };
    console.log('Created order:', order);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error(`Failed to create order: ${error.message}`);
  }
};
