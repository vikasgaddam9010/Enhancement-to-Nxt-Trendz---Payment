import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const PaymentSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const totalOrderedValue = cartList.map(
          each => each.price * each.quantity,
        )

        const updatePaymentMethod = event => {
          const {id} = event.target
          setPaymentMethod(id)
        }

        const onPlaceOrder = () => setIsOrderPlaced(true)

        const renderPaymentMethodsInput = () => (
          <ul className="ul-payment-container">
            {paymentOptionsList.map(each => (
              <li key={each.id} className="li-method-input-container">
                <input
                  className="payment-method-input"
                  id={each.id}
                  type="radio"
                  name="paymentMethod"
                  disabled={each.isDisabled}
                  onChange={updatePaymentMethod}
                />
                <label
                  className={`payment-method-label ${
                    each.isDisabled ? 'disabled-label' : 'black'
                  }`}
                  htmlFor={each.id}
                >
                  {each.displayText}
                </label>
              </li>
            ))}
          </ul>
        )
        return (
          <div className="payments-container">
            {isOrderPlaced ? (
              <p className="success-message">
                Your order has been placed successfully
              </p>
            ) : (
              <>
                <h1 className="payments-heading">Payments Summary</h1>
                <p className="payments-sub-heading">
                  Selcet COD Payment Method
                </p>
                {renderPaymentMethodsInput()}
                <div className="order-details">
                  <p className="order-details-sub-heading">Order details:</p>
                  <p>Quantity: {cartList.length}</p>
                  <p>Total Price: RS {totalOrderedValue}/-</p>
                </div>
                <button
                  disabled={paymentMethod === ''}
                  type="button"
                  className="confirm-order-button"
                  onClick={onPlaceOrder}
                >
                  Confirm Order
                </button>
              </>
            )}
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default PaymentSummary
