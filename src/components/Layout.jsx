import { useState } from "react"
import Modal from "./Modal" 
import Authentication from "./Authentication"
import { useAuth } from "../context/AuthContext"
export default function Layout(props){
    const {children} = props

    const [showModal , setShowModal] = useState(false)
    const {globalUser , logout} = useAuth()
    const header = (<header>
        <div>
            <h1 className="text-gradient">CAFFIEND</h1>
            <p>FOR Coffee Insatiates</p>     
        </div>
        {globalUser ? (
            <button onClick={logout}>
            <p>LogOut</p>
            <i className="fa-solid fa-mug-hot"></i>
        </button>
        ) : (
            <button onClick={() => {setShowModal(true)}}>
            <p>Sign Up Free</p>
            <i className="fa-solid fa-mug-hot"></i>
        </button>
        )}
    </header>)
    const footer = (<footer>
        <p><span className="text-gradient">Caffiend</span> was made by <a href="https://github.com/JayTheCoder77" target="_blank">JayJr.<br/></a> using the <a href="https://linkedin.com" target="_blank">FantaCss</a> design library.<br/>Check out the project on <a href="https://github.com/JayTheCoder77/firebase-coffee-tracker" target="_blank">Github</a></p>
    </footer>)

    function handleCloseModal(){
        setShowModal(false)
    }

    return(
        <>
        {showModal && (    
            <Modal handleCloseModal = {handleCloseModal}>
                <Authentication handleCloseModal = {handleCloseModal}/>
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