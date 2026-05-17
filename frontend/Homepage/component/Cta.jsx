import {Link} from "react-router-dom";



const CTA =()=>{


    return (

        <section className="px-6 py-32">
            <div className="max-w-5xl mx-auto">

                <div className="bg-[#111111] border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-2xl shadow-black/40">
                
                <p className="text-zinc-500 uppercase tracking-[0.2em] text-sm mb-4"> Start Today</p>


                <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
                    Create your private space for focused conversations.
                </h1>


                    <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
                    Build invite-only communities, connect with your people,
                    and communicate in realtime without unnecessary noise.
                    </p>



                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                        to="/auth"
                        className="bg-white text-black px-6 py-3 rounded-2xl font-medium hover:bg-zinc-200 transition"
                        >
                        Get Started
                        </Link>

                        <a
                        href="#features"
                        className="border border-white/10 text-white px-6 py-3 rounded-2xl hover:bg-white/5 transition"
                        >
                        Explore Features
                        </a>
                    </div>

                
                </div>


            </div>

                



        </section>


    )



}


export default CTA;