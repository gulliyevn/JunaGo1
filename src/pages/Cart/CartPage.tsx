import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { demoCourses } from '../../services/demoData';
import styles from './Cart.module.css';

// Имитация данных корзины, в реальном приложении это хранилось бы в контексте/redux
const initialCartItems = [
  { courseId: 'course-2', quantity: 1 },
  { courseId: 'course-4', quantity: 1 }
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  // Получаем данные о курсах из демо-данных
  const cartCourses = demoCourses.filter(course => 
    cartItems.some(item => item.courseId === course.id)
  );
  
  // Расчет общей стоимости
  const subtotal = cartCourses.reduce((sum, course) => {
    const cartItem = cartItems.find(item => item.courseId === course.id);
    const price = course.salePrice || course.price;
    return sum + (price * (cartItem?.quantity || 0));
  }, 0);
  
  // Применяем скидку 10% для примера
  const discount = subtotal * 0.1;
  const total = subtotal - discount;
  
  // Удаление курса из корзины
  const removeFromCart = (courseId: string) => {
    setCartItems(cartItems.filter(item => item.courseId !== courseId));
  };
  
  return (
    <div className={styles.cartContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Your Shopping Cart</h1>
        <p className={styles.pageSubtitle}>
          Review your items and proceed to checkout
        </p>
      </div>
      
      <div className={styles.cartContent}>
        {cartCourses.length > 0 ? (
          <div className={styles.cartLayout}>
            <div className={styles.cartItemsList}>
              {cartCourses.map(course => (
                <div key={course.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img 
                      src={course.imageUrl || '/assets/course-placeholder.jpg'} 
                      alt={course.title} 
                      onError={(e) => {
                        // Fallback for missing images
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/course-placeholder.jpg';
                      }}
                    />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>{course.title}</h3>
                    <div className={styles.itemMeta}>
                      <span className={styles.itemLevel}>{course.level}</span>
                      <span className={styles.itemDuration}>{course.duration}</span>
                    </div>
                    <div className={styles.itemActions}>
                      <button 
                        className={styles.removeButton}
                        onClick={() => removeFromCart(course.id)}
                      >
                        Remove
                      </button>
                      <Link 
                        to={`/courses/${course.id}`} 
                        className={styles.viewButton}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  
                  <div className={styles.itemPrice}>
                    {course.salePrice ? (
                      <>
                        <span className={styles.salePrice}>${course.salePrice.toFixed(2)}</span>
                        <span className={styles.originalPrice}>${course.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className={styles.price}>${course.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              
              <div className={styles.summaryItem}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className={styles.summaryItem}>
                <span>Discount (10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              
              <div className={styles.summaryDivider}></div>
              
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className={styles.couponCode}>
                <input 
                  type="text" 
                  placeholder="Enter coupon code" 
                  className={styles.couponInput}
                />
                <button className={styles.couponButton}>Apply</button>
              </div>
              
              <button className={styles.checkoutButton}>
                Proceed to Checkout
              </button>
              
              <div className={styles.secureCheckout}>
                <span className={styles.secureIcon}>🔒</span>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any courses to your cart yet.</p>
            <Link to="/courses" className={styles.browseCourses}>
              Browse Courses
            </Link>
          </div>
        )}
      </div>
      
      <div className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>You might also like</h2>
        <div className={styles.relatedCourses}>
          {demoCourses
            .filter(course => !cartItems.some(item => item.courseId === course.id))
            .slice(0, 3)
            .map(course => (
              <div key={course.id} className={styles.relatedCourse}>
                <img 
                  src={course.imageUrl || '/assets/course-placeholder.jpg'} 
                  alt={course.title}
                  className={styles.relatedImage}
                  onError={(e) => {
                    // Fallback for missing images
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/course-placeholder.jpg';
                  }}
                />
                <h3 className={styles.relatedTitle}>{course.title}</h3>
                <div className={styles.relatedPrice}>
                  {course.salePrice ? (
                    <>
                      <span className={styles.salePrice}>${course.salePrice.toFixed(2)}</span>
                      <span className={styles.originalPrice}>${course.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className={styles.price}>${course.price.toFixed(2)}</span>
                  )}
                </div>
                <button 
                  className={styles.addToCartButton}
                  onClick={() => setCartItems([...cartItems, { courseId: course.id, quantity: 1 }])}
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage; 