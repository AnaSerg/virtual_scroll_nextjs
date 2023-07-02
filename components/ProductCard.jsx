import React from 'react';
import styles from '../styles/productcard.module.scss';

const ProductCard = ({ name, price, photo, article }) => {
    return (
        <div className={`${styles.card} ${styles.fadeIn}`} key={article}>
            <img className={styles.photo} src={photo} />
            <p className={styles.name}>{name}</p>
            <p className={styles.price}>{price}</p>
        </div>
    );
};

export default ProductCard;
