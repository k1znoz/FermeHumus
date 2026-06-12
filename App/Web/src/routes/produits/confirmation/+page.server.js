import { client } from '$lib/sanity.js';

export async function load({ url }) {
  const orderNumber = url.searchParams.get('order');

  if (!orderNumber) {
    return { order: null };
  }

  const order = await client.fetch(
    `*[_type == "productOrder" && orderNumber == $orderNumber][0]{
			orderNumber,
			status,
			customerName,
			pickupLocation,
			referralSource,
			newsletterOptIn,
			reservedAt,
			totalAmount,
			items[]{
				productName,
				quantity,
				unitPrice,
				subtotal
			}
		}`,
    { orderNumber }
  );

  return { order };
}
