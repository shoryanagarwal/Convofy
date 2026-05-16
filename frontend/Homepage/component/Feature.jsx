import FeatureCard from "./FeatureCard";


const Features = ()=>{

    const features=[


        {
            title:"Real-time Messaging",
            description:"Experience seamless communication with our real-time messaging feature, allowing you to connect instantly with friends and colleagues."
        },
        {
            title:"Private Groups",
            description:"Create private groups for focused discussions and collaboration, ensuring your conversations stay secure and organized."
        },

        {
            title:"Secure Authentication",
            description:"Our secure authentication system ensures that your data and conversations are protected, giving you peace of mind while using our platform."

        },

        {
            title:"Minimal Interface",
            description:"Enjoy a clean and intuitive interface designed to minimize distractions and enhance your communication experience."
        }






    ];


    return (

        <section id="features" className="px-6 py-32">

            <div className="max-w-7xl mx-auto">

                {/*Heading*/}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-semibold text-white mb-4 ">
                        Features
                    </h1>

                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Everything you need to build focused
                        realtime communities.

                    </p>

                </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {features.map((feature,index)=>{

                    <FeatureCard key={index}
                    title={feature.title}
                    description={feature.description} />


                })}



            </div>



            </div>


        </section>



    )


}

export default Features;