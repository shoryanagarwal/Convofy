
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
                            <button className="bg-white text-black px-6 py-3 roundex-2xl font-medium hover:bg-zinc-200 transition">
                                Get Started


                            </button>

                            <button className="border border-white/10 text-white px-6 py-3 rounded-2xl hover:bg-white/5 transition">

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

                <div className="bg-[#111111] border border-white/10 rounded-3xl h-125 flex flex-centre justify-center items-center text-zinc-500">

                    Chat UI Preview
                </div>


            </div>



        </section>










    )





}


export default Hero;

