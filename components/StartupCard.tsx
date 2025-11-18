// Imports the date formatting utility, icons, and Next.js components.
import { formatDate } from "@/lib/utils";
import type { StartupTypeCard } from "@/lib/types";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Defines the StartupCard component, which receives a 'post' object as a prop.
const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    // Destructures the necessary properties from the post object for easier access.
    // The author's '_id' is renamed to 'authorId' to avoid naming conflicts.
    const {
      _createdAt,
      views,
      author:{_id: authorId, name},
      title,
      category,
      _id,
      image,
      description,
    } = post;
  
  return (
    // The list item container for the entire card.
    <li className="startup-card group">
      {/* Header section of the card displaying date and view count. */}
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      {/* Section displaying author info and startup title. */}
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        {post.author.image && (
          <Link href={`/user/${authorId}`}>
            <Image
              src={post.author.image}
              alt={name}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        )}
      </div>

      {/* Main content section with description and image, linking to the startup's detail page. */}
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      {/* Footer section with category link and a details button. */}
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard;

