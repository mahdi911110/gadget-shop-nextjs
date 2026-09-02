import Image from 'next/image';

import styles from './page.module.css';
import dayjs from 'dayjs';
import ButtonBuyAgain from './ButtonBuyAgain';

type UserOrderItems = {
  id: number,
  product_id: number,
  quantity: string,
  delivery_option: number,
  product_name: string,
  image_url: string
};

export default function OrderContainer({ orderItem, createdAt }: { orderItem: UserOrderItems, createdAt: string }) {
  let dayToDeliver;
  switch (orderItem.delivery_option) {
    case 0:
      dayToDeliver = 7;
      break;
    case 1:
      dayToDeliver = 3;
      break;
    case 2:
      dayToDeliver = 1;
      break;
    default:
      dayToDeliver = 1;
      break;
  }

  let statusText = 'Not Found';
  let statusIcon = '🔴';
  const createdDate = dayjs(createdAt, 'D MMMM YYYY');
  const deliveryDate  = dayjs(createdAt, 'D MMMM YYYY').add(dayToDeliver, 'day');
  const shippingDate = createdDate.add(Math.round(dayToDeliver / 2), 'day');
  const today = dayjs();
  
  if (today.isBefore(shippingDate)) {
    statusText = 'Preparing and will be deliverd on';
    statusIcon = '🟣';
  } else if (today.isBefore(deliveryDate)) {
    statusText = 'Shipped and will be deliverd on';
    statusIcon = '🟡';
  } else {
    statusText = 'Deliverd on';
    statusIcon = '🟢';
  }
  return (
    <div className={styles['order-detail']}>
      <div className={styles['order-img-text-container']}>
        <div className={styles['order-img-container']}>
          <Image src={orderItem.image_url} alt='MacBook Pro 16' sizes='80px' fill/>
        </div>
        <div className={styles['order-text-container']}>
          <div className={styles['order-text-title']}>{orderItem.product_name}</div>
          <div className={styles['order-text-quantity']}>Quantity: {orderItem.quantity}</div>
          <ButtonBuyAgain productId={orderItem.product_id} />
        </div>
      </div>
      <div className={styles['order-date-container']}>
        <div className={styles['order-date']}>
          {statusIcon} <span className={styles['deliver-text']}>{statusText} </span>{deliveryDate.format('D MMMM YYYY')}
        </div>
      </div>
    </div>
  );
}