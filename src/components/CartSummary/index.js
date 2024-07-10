import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import PaymentSummary from '../PaymentSummary'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const cartListLen = cartList.length === 1 ? 'Item' : 'Items'

      let total = 0

      cartList.forEach(each => {
        total += each.quantity * each.price
      })

      return (
        <div className="ordered-value-total-amount">
          <>
            <h1 className="order-value">
              Order Total:
              <span className="span-total-amout"> Rs {total}/-</span>
            </h1>
            <p className="cart-quantity">
              {cartList.length} {cartListLen} in cart
            </p>
            <div>
              <Popup
                modal
                trigger={
                  <button type="button" className="chechkout-btn">
                    Checkout
                  </button>
                }
              >
                {close => <PaymentSummary close={close} />}
              </Popup>
            </div>
          </>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
