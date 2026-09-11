import Image from 'next/image';

import styles from './page.module.css';
import dayjs from 'dayjs';
import ButtonBuyAgain from './ButtonBuyAgain';
import Translation from '@/components/translation/Translation';

type UserOrderItems = {
  id: number,
  product_id: number,
  quantity: string,
  delivery_option: number,
  product_name: string,
  image_url: string
};

export default function OrderContainer({ orderItem, createdAt, lang }: { orderItem: UserOrderItems, createdAt: string, lang: 'fa' | 'en' }) {
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

  let statusText = <Translation translationKey='order.statusTextNotFound' />;
  let statusIcon = '🔴';
  const createdDate = dayjs(createdAt, 'D MMMM YYYY');
  const deliveryDate  = dayjs(createdAt, 'D MMMM YYYY').add(dayToDeliver, 'day');
  const shippingDate = createdDate.add(Math.round(dayToDeliver / 2), 'day');
  const today = dayjs();
  
  if (today.isBefore(shippingDate)) {
    statusText = <Translation translationKey='order.statusTextPreparing' />;
    statusIcon = '🟣';
  } else if (today.isBefore(deliveryDate)) {
    statusText = <Translation translationKey='order.statusTextShipping' />;
    statusIcon = '🟡';
  } else {
    statusText = <Translation translationKey='order.statusTextDeliverd' />;
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
          <div className={styles['order-text-quantity']}><Translation translationKey='cart.card.quantity' /> {orderItem.quantity}</div>
          <ButtonBuyAgain lang={lang} productId={orderItem.product_id} />
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