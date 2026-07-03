import Link from "next/link";

interface ServiceCardProps {
  emoji: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function ServiceCard({
  emoji,
  title,
  description,
  buttonText = "聊聊合作",
  buttonHref = "/about",
}: ServiceCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{emoji}</span>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4 flex-1">{description}</p>
      <Link
        href={buttonHref}
        className="inline-block text-sm text-center px-4 py-2 rounded-lg border border-brand-orange text-brand-orange font-medium hover:bg-brand-orange hover:text-white transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}
