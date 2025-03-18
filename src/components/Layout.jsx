export default function Layout(props){
    const {children} = props
    const header = (<header>
        <div>
            <h1 className="text-gradient">CAFFIEND</h1>
            <p>FOR Coffee Insatiates</p>     
        </div>
        <button>
            <p>Sign Up Free</p>
            <i className="fa-solid fa-mug-hot"></i>
        </button>
    </header>)
    const footer = (<footer>
        <p><span className="text-gradient">Caffiend</span> was made by <a href="https://github.com/JayTheCoder77" target="_blank">JayJr.<br/></a> using the <a href="https://linkedin.com" target="_blank">FantaCss</a> design library.</p>
    </footer>)
    return(
        <>
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}