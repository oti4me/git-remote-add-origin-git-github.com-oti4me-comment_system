import { CircleUserRound } from "lucide-react";
import { formatDistance, parseISO } from "date-fns";

interface AuthorProps {
  author: string;
  timestamp: string;
}

export const Author = ({ author, timestamp }: AuthorProps) => {
  const parsedDate = parseISO(timestamp);
  const formattedDate = formatDistance(parsedDate, new Date(), {
    addSuffix: true,
  });

  return (
    <div className="mt-1 flex items-center space-x-2">
      <CircleUserRound className="text-gray-500" size={24} aria-hidden="true" />
      <address className="text-sm font-medium text-gray-900 not-italic">
        {author}
      </address>
      <span aria-hidden="true">&middot;</span>
      <time
        className="text-sm text-gray-500"
        dateTime={timestamp}
        title={parsedDate.toLocaleString()}
      >
        {formattedDate}
      </time>
    </div>
  );
};
