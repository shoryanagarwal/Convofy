const FeatureCard = ({ title, description }) => {
  return (
    <div
      className="
        bg-[#111111]
        border
        border-white/10
        rounded-3xl
        p-6
        hover:border-white/20
        transition
      "
    >
      <h2
        className="
          text-white
          text-xl
          font-semibold
          mb-3
        "
      >
        {title}
      </h2>

      <p
        className="
          text-zinc-400
          leading-relaxed
        "
      >
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;