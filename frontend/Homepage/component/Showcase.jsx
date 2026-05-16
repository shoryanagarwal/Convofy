// this is the showcase component which will show the screenshots of the app and some testimonials from the users


const Showcase= ()=>{

    const messages=[
        {
            name:"John Doe",
            message:"Convofy has transformed the way I communicate with my friends and family. The seamless interface and real-time messaging make it a joy to use. Highly recommended!",
            time:"9:30 AM",

        },
        {
            name:"Jane Smith",
            message:"I love how Convofy keeps my conversations organized and secure. The private groups feature is a game-changer for my work teams. It's the best messaging app I've ever used!",
            time:"10:15 AM",

        },

        {
            name:"Alice Johnson",
            message:"Convofy's minimal interface is perfect for staying focused on my conversations without distractions. The end-to-end encryption gives me peace of mind knowing my messages are secure.",
            time:"11:00 AM",
        },



    ];







    return (


            <section className="px-6 py-32">


                <div className="max-w-7xl mx-auto">


                    {/* Heading */}
                    <div className="text-centre mb-16">

                        <h1 className="text-4xl font-semibold text-white mb-4">
                            Build For Modern Communication
                        </h1>


                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            A clean and focused workspace designed for realtime collaboration and communication.

                        </p>




                    </div>


                    {/*Main*/}

                    <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden grid lg:grid-cols-[260px_1fr] min-h-150">
                    
                        
                        {/*Sidebar*/}

                        <div className="border-r border-white/10 p-5">
                            <h2 className="text-white font-semibold text-lg mb-8">Convofy</h2>


                            <div className="space-y-3">

                                <div className="bg-white/10 text-white px-4 py-3 rounded-2xl">
                                    # general
                                </div>



                                <div className="text-zinc-400 px-4 py-3 rounded-2xl hover:bg-white/5 transition">
                                
                                    # development
                                </div>


                                <div className="text-zinc-400 px-4 py-3 rounded-2xl hover:bg-white/5 transition">
                                
                                    # design
                                </div>



                                <div className="text-zinc-400 px-4 py-3 rounded-2xl hover:bg-white/5 transition">
                                
                                    # announcements
                                </div>


                                

                            </div>



                        </div>



                        {/*Chat */}

                        <div className="flex flex-col">
                            <div className="border-b
                            border-white/10 px-6 py-5 ">

                                <h2 className="text-white text-lg font-semibold">
                                    # general
                                </h2>




                            </div>

                        {/*messages*/}

                        <div className="flex-1 p-6 space-y-6" >

                            {messages.map((message,index)=>{

                                
                                <div key={index}
                                className="flex gap-4">

                                    {/*Avatar*/}
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">


                                    {message.name.charAt(0)};



                                    </div>


                                    {/*Message Content*/}


                                    <div>

                                        <div className="flex items-center gap-3">

                                            <h3 className="text-white font-medium">
                                                {message.name}
                                            </h3>

                                        <span className="text-zinc-500 text-sm">{message.time}</span>


                                            
                                        </div>


                                      <p className="text-zinc-400 mt-1">
                                        {message.message}
                                        </p>  






                                    </div>





                                </div>



                            })}

                        </div>


                        {/*Input*/}
                        <div className="p-6">

                            <div className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-zinc-500">
                            
                                Message #general
                            </div>

                        </div>


                        </div>

                    
                    
                    
                    </div>

                </div>









            </section>







    )






}


export default Showcase;