import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 sm:py-4">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
            {item.href && index !== items.length - 1 ? (
              <Link
                to={item.href}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
