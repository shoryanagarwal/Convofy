import {Link} from "react-router-dom";


const Hero = ()=>{

    return (

        <section className="min-h-screen flex items-centre justify-center px-6 pt-24">

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center"> 

                {/*left side content*/}

                <div>

                    <p className="text-sm text-zinc-400 mb-4 uppercase tracking">Private • Secure • Realtime</p>


                    <h1 className="text-5xl lg:text-7xl font-semibold leading-tight tracking-tight text-white">
                        
                        Modern

                        <br />
                        Communication
                        <br />
                        For Focused
                        <br />
                         Communities.
                        </h1>


                        <p className="mt-6 text-zinc-400 text-lg max-w-xl leading-relaxed">

                         Convofy helps teams and communities
                            communicate in realtime without the
                                noise of traditional social platforms.

                        </p>



                        <div className="flex gap-4 mt-8">
                            <Link to="/auth" className="bg-white text-black px-6 py-3 rounded-4xl font-medium hover:bg-zinc-200 transition">
                                Get Started


                            </Link>

                            <button to="/auth" className="border border-white/10 text-white px-6 py-3 rounded-2xl hover:bg-white/5 transition">

                            Explore Features


                            </button>


                        </div>

                        <div className="flex gap-10 mt-12">
                            <div>
                                <h3 className="text-white text-xl font-semibold"> 50ms</h3>

                                <p className="text-zinc-500 text-sm">
                                    avg delivery
                                </p>
                            
                            </div>

                            <div>
                                <h3 className="text-white text-xl font-semibold">  E2E</h3>


                                <p className="text-zinc-500 text-sm">
                                    encrypted
                                </p>

                            </div>


                            <div>
                                <h3 className="text-white text-xl font-semibold"> 99.9%</h3>    

                                <p className="text-zinc-500 text-sm">
                                    uptime
                                </p>
                            </div>


                        </div>

                </div>



                {/* right side image */}

                <div className="relative">

  <div className="absolute -top-8 -left-8 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />

  <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-yellow-500/10 blur-3xl rounded-full" />

  <div className="relative bg-[#111111]/90 border border-white/10 rounded-3xl p-5 backdrop-blur-xl shadow-2xl">

    {/* HEADER */}
    <div className="flex items-center justify-between border-b border-white/10 pb-4">

      <div className="flex items-center gap-3">

        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold">
          A
        </div>

        <div>
          <h3 className="text-white font-medium">
            Alex Morgan
          </h3>

          <p className="text-xs text-green-400">
            Online
          </p>
        </div>

      </div>

      <div className="text-zinc-500">
        ⋮
      </div>

    </div>

    {/* CHAT */}
    <div className="mt-5 space-y-4">

      <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-sm text-zinc-200 w-fit max-w-[80%]">
        Hey 👋 Welcome to Convofy
      </div>

      <div className="ml-auto bg-[#d6ad4a] text-black rounded-2xl px-4 py-3 text-sm w-fit max-w-[80%]">
        This UI looks insane 🚀
      </div>

      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
        alt="preview"
        className="rounded-2xl h-52 w-full object-cover border border-white/10"
      />

      <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-sm text-zinc-200 w-fit max-w-[80%]">
        Realtime messaging + image sharing ⚡
      </div>

      <div className="flex gap-1 px-2">

        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" />
        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce delay-100" />
        <span className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce delay-200" />

      </div>

    </div>

  </div>

</div>


            </div>



        </section>










    )





}


export default Hero;

