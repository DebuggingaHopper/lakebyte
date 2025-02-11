// import link artifacts
import Link from 'next/link';
// import image artifacts
import Image from 'next/image';

// Thumbnail properties
type Props = {
    // Thumbnail title
    title: string;
    // Thumbnail image src
    src: string;
    // Thumbnail slug link
    slug?:string;
}

const Thumbnail: React.FC<Props> = ({ title, src, slug}: Props) => {
  // Add the Thumbnail cover image
    const image = (
        <Image
        height={720}
        width={1280}
        src={src}
        alt={`Thumbnail cover image ${title}`}
        className="object-scale-down max-h-screen drop-shadow-md rounded-md m-auto"
        />
    );

    // return the Thumbnail cover image slug
    return <>
        {slug ? (
            <Link href={`/posts/${slug}`} aria-label={title}>
            {image}
            </Link>
        ) : (
            image
        )}
    </>;
}

// export Thumbnail module
export default Thumbnail;
