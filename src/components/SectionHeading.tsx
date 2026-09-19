import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  repeat = false,
}: {
  eyebrow: string;
  title: string;
  repeat?: boolean;
}) {
  return (
    <Reveal className="mb-10 sm:mb-14" repeat={repeat}>
      <p className="text-sm font-medium tracking-[0.2em] text-emerald-400 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">{title}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400" />
    </Reveal>
  );
}
