const { useEffect } = require("react");
import {Link} from 'react-router-dom'

const Navbar =() =>{

    const [scrolled, setScrolled] = useState(false); // State to track if the user has scrolled
    const [mobileMenu,setmobileMenu]=useState(false); // State to track if the mobile menu is open

    useEffect(()=>{

        const handleScroll= ()=>{
            setScrolled(window.scrollY > 20);
        }


        window.addEventListener('scroll',handleScroll);


        return ()=>{
            window.removeEventListener('scroll',handleScroll);// Clean up the event listener on component unmount
        }

    },[])


    return (


            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/10":"bg-transparent"}`}

            >
                <div
                    className="max-w-7xl , mx-auto px-6 h-16 flex items-center justify-between"
                
                >

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold">

                        C


                        </div>

                    <h1 className="text-white font-semibold text-lg tarcking-tight">CONVOFY</h1>


                    </div>


                    {/* Navigation Links */}

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-zinc-400 hover:text-white transition"> Features </a>

                         <a href="#about" className="text-zinc-400 hover:text-white transition"> About </a>

                         <a href="#contact" className="text-zinc-400 hover:text-white transition"> Contact </a>

                    </div>


                    {/* Call to Action Button */}

                    <div className='hidden md:flex items-center gap-3'>

                        <Link to="/auth" className="text-zinc-400 hover:text-white transition">Login</Link>


                         <Link to="/auth" className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-zinc-200 transition">Get Started</Link>


                    </div>


                    
                    
                    
                    {/* Mobile Menu  */} 

                    <button onClick={()=>setmobileMenu(!mobileMenu)} className='md-hidden text-white'> 
                      ☰</button>



                </div>


                
                    {mobileMenu && (

                        <div className='md-hidden bg-[#111111] border-t border-white/10 px-6 py-5 flex flex-col gap-5'>

                            <a href="#features" className="text-zinc-300 "> Features </a>


                            <a href="#about" className="text-zinc-300 "> About </a>

                            <a href="#contact" className="text-zinc-300 "> Contact </a>


                            <Link to="/auth" className="text-zinc-300 ">Login</Link>

                            <Link to="/auth" className="bg-white text-black px-4 py-2 rounded-xl font-medium text-center">Get Started</Link>





                        </div>




                    )}






            </nav>


    )


}


export default Navbar;