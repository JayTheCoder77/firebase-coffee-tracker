import { useState } from "react"
import Modal from "./Modal" 
import Authentication from "./Authentication"
export default function Layout(props){
    const {children} = props

    const [showModal , setShowModal] = useState(false)
    const header = (<header>
        <div>
            <h1 className="text-gradient">CAFFIEND</h1>
            <p>FOR Coffee Insatiates</p>     
        </div>
        <button onClick={() => {setShowModal(true)}}>
            <p>Sign Up Free</p>
            <i className="fa-solid fa-mug-hot"></i>
        </button>
    </header>)
    const footer = (<footer>
        <p><span className="text-gradient">Caffiend</span> was made by <a href="https://github.com/JayTheCoder77" target="_blank">JayJr.<br/></a> using the <a href="https://linkedin.com" target="_blank">FantaCss</a> design library.<br/>Check out the project on <a href="https://github.com/JayTheCoder77/firebase-coffee-tracker" target="_blank">Github</a></p>
    </footer>)
    return(
        <>
        {showModal && (    
            <Modal handleCloseModal = {() => {setShowModal(false)}}>
                <Authentication />
            </Modal>
        )}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}