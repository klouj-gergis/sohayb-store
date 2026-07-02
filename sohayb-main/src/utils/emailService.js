import emailjs from '@emailjs/browser';

export function sendOrderEmail(orderData) {
  const templateParams = {
    customer_name: orderData.customer_name,
    customer_email: orderData.customer_email,
    product_name: orderData.product_name,
    bottle_size: orderData.size,
    price: orderData.price,
    count: orderData.count,
    address: orderData.address,
    total: orderData.total,
    message: orderData.notes || 'No additional notes'
  };

  return emailjs.send(
    'service_hh80khg',
    'template_qfb2j8a',
    templateParams,
    'FXnoRJYmFE_vd6Ts2'
  );
}


export function sendContactEmail(orderData) {
  const templateParams = {
    email: orderData.email,
    message: orderData.message,
    name: orderData.name
  };

  return emailjs.send(
    'service_hh80khg',
    'template_pvkyf3j',
    templateParams,
    'FXnoRJYmFE_vd6Ts2'
  );
}