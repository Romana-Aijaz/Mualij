import "./payment.css";
import {AiOutlineMenu} from "react-icons/ai";
import {AiFillBank, AiFillCreditCard} from "react-icons/ai";
import {MdPayments} from "react-icons/md";


export default function Payment({elements, stripe}) {
   
    
    return (
      <>
        <div className="leftContainer">
          <div className="leftContainerWrapper">
            <span className="paymentMethods">Pay With</span>
          </div>
        </div>
        <hr className="leftContainerDivider"></hr>
        <div className="leftContainer">
          <div className="leftContainerWrapper">
            <AiFillBank className="bankIcon"/>
            <span className="payWithText">Bank</span>
          </div>
        </div>
        <hr className="leftContainerDivider"></hr>
        <div className="leftContainer">
          <div className="leftContainerWrapper">
            <AiFillCreditCard className="bankIcon"/>
            <span className="payWithText">Card</span>
          </div>
        </div>
        <hr className="leftContainerDivider"></hr>
        <div className="leftContainer">
          <div className="leftContainerWrapper">
            <MdPayments className="bankIcon"/>
            <span className="payWithText">Easy Paisa</span>
          </div>
        </div>
        <hr className="leftContainerDivider"></hr>
        <div class="middleContainer">
          <div className="middleContainerHeader">
            <AiOutlineMenu className="headerMenuIcon"/>
            <span className="emailId">romanaaijaz99@gmail.com</span>
          </div>
          <div className="middleContainerBody">
              <button className="paymentButton">Pay</button>
              <div className="userPaymentDetails">
                <span className="creditCardHeading">Enter your credit card details</span>
                <div className="cardDetails">
                  <span className="cardNumberDetail">Card Number</span>
                  <div>
                     <input className="cardInput" placeholder="0000 0000 0000 0000" />
                  </div>
                </div>
                <div className="cardExpiryDetails">
                  <div className="cardExpiryDate">
                    <span className="cardNumberDetail">Card Expiry</span>
                  <div>
                     <input className="cardInput" placeholder="MM/YY" />
                </div>
                  
              </div>
              </div>
              <div className="submitContainer">
                <button className="submitBtn">Pay $100</button>
              </div>
              </div>
          </div>
        </div>
        
      </>
    )
}