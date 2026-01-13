import { createPaymentOrder } from './api';

interface CartItem {
  item_id: string;
  quantity: number;
}
export const initiatePayment = async (
  cartItems: CartItem[],
  stallId: string,
  userEmail: string,
  userName: string
): Promise<{ 
  success: boolean; 
  paymentId?: string; 
  orderId?: string;    
  signature?: string;  
  error?: string 
}> => {
  try {
    console.log('🔄 Creating payment order...', { stallId, items: cartItems });
    
    const orderData = await createPaymentOrder(stallId, cartItems);

    console.log('✅ Order created:', orderData);

    if (!(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      await new Promise((resolve, reject) => {
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      });
    }

    const options = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'GreenPlate',
      description: 'Food Order Payment',
      order_id: orderData.id,
      prefill: {
        email: userEmail,
        name: userName,
      },
      theme: { color: '#10B981' },
    };

    return new Promise((resolve) => {
      try {
        const rzp = new (window as any).Razorpay(options);
        
        rzp.on('payment.success', (response: any) => {
          console.log('✅ Payment success:', response);
          // 2. Resolve ALL required verification data
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          });
        });

        rzp.on('payment.failed', (response: any) => {
          console.log('❌ Payment failed:', response);
          resolve({
            success: false,
            error: response.error?.description || 'Payment failed'
          });
        });

        rzp.open();
      } catch (error: any) {
        resolve({
          success: false,
          error: error.message || 'Failed to open payment gateway'
        });
      }
    });

  } catch (error: any) {
    console.error('❌ Payment Error:', error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Server error';
      return {
        success: false,
        error: errorMessage
      };
    } else if (error.request) {
      return {
        success: false,
        error: 'Cannot connect to server'
      };
    } 
    else {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Payment failed'
      };
    }
  }
}