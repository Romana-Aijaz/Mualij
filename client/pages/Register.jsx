import "./register.css";
 export default function Register() {
     return (
         <div className="registerContainer">
             <div className="registerWrapper">
                 <div className="registerLeft">
                     <h3 className="registerLogo">Mualij</h3>
                     <span className="registerDesc">Description here!</span>
                 </div>
                 <div className="registerRight">
                     <div className="registerBox">
                         <input type="text" className="registerInput" placeholder="Email" />
                         <input type="text" className="registerInput" placeholder="First Name" />
                         <input type="text" className="registerInput" placeholder="Last Name" />
                         <input type="text" className="registerInput" placeholder="Age" />
                         <input type="text" className="registerInput" placeholder="Occupation" />
                         <input placeholder="Password" className="registerInput" />
                         <input placeholder="Confirm Password" className="registerInput" />
                         <button className="registerButton">Sign Up</button>
                         <button className="registerRegisterButton">Log into Account</button>
                     </div>
                 </div>
             </div>
         </div>
     )
 }