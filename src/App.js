import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const {id, quantity} = product

    const existingProductIndex = cartList.findIndex(item => item.id === id)

    if (existingProductIndex !== -1) {
      this.setState(prevState => {
        const updatedCartList = [...prevState.cartList]
        updatedCartList[existingProductIndex].quantity += quantity
        return {cartList: updatedCartList}
      })
    } else {
      return this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
    return null
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const index = cartList.find(each => each.id === id)

    if (index !== undefined) {
      const updated = cartList.map(each => {
        if (each.id === id) {
          return {
            ...each,
            quantity: each.quantity + 1,
          }
        }
        return each
      })
      this.setState({cartList: updated})
    }
    return null
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const index = cartList.find(each => each.id === id)

    if (cartList.length === 1 && index.quantity === 1) {
      this.setState({cartList: []})
    } else if (index !== undefined && index.quantity >= 2) {
      const updated = cartList.map(each => {
        if (each.id === id) {
          return {
            ...each,
            quantity: each.quantity - 1,
          }
        }
        return each
      })
      return this.setState({cartList: updated})
    }
    return null
  }

  removeCartItem = id => {
    const {cartList} = this.state
    this.setState({cartList: cartList.filter(each => each.id !== id)})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
