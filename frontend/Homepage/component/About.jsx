const About = () => {
  return (
    <section id="about" className="px-6 py-32 bg-[#0b0b0c]">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>

          <p className="text-[#c9a96e] uppercase tracking-[0.2em] text-sm mb-4">
            About Convofy
          </p>

          <h1 className="text-4xl font-semibold text-white mb-6 leading-tight">
            Built for focused and private communication.
          </h1>

          <p className="text-zinc-400 leading-relaxed mb-6">
            Convofy is designed to bring meaningful conversations back to the center.
            In a world filled with noisy communication platforms, we focus on simplicity,
            speed, and privacy.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            Whether you're collaborating with a team or connecting with close communities,
            Convofy provides a clean and distraction-free environment powered by realtime messaging.
          </p>

        </div>

        {/* Right Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition">
            <h3 className="text-white font-medium mb-2">
              Privacy First
            </h3>
            <p className="text-zinc-400 text-sm">
              Your conversations stay private with secure authentication and controlled access.
            </p>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition">
            <h3 className="text-white font-medium mb-2">
              Realtime Messaging
            </h3>
            <p className="text-zinc-400 text-sm">
              Experience instant communication with minimal latency powered by modern technology.
            </p>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition">
            <h3 className="text-white font-medium mb-2">
              Minimal Interface
            </h3>
            <p className="text-zinc-400 text-sm">
              A distraction-free design that helps you focus on what really matters — conversations.
            </p>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:bg-white/5 transition">
            <h3 className="text-white font-medium mb-2">
              Community Driven
            </h3>
            <p className="text-zinc-400 text-sm">
              Build invite-only spaces and connect with people who truly matter.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default About;