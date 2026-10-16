
import { formatDate } from "@/utils/stapi-utils";
import Link from "next/link";

const FeaturedEvents = ({ event }: any) => {
  return (
    <Link
      href={`/events/${event.id}`}
      className="featured-items__article"
    >
      <div className="featured-items__article-img">
        <img
          src={event.image}
          alt={`Go check out the event ${event.name}`}
        />
      </div>

      <div className="featured-items__article-text featured-items__article-text--event">
        <h5>{event.name}</h5>
        <p className="copy-small">
          {formatDate(event.startingDate)}
        </p>
        <p className="copy-small bold">
          Prices starting at {event.sharedPrice}
        </p>
      </div>
    </Link>
  );
};

export default FeaturedEvents;
