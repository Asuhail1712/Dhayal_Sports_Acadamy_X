import type { AcademyPhoto } from "@/lib/academy-media";

export function PhotoFrame({
  photo,
  position = photo.position ?? "50% 50%",
  sizes,
  loading = "lazy",
  fetchPriority,
}: {
  photo: AcademyPhoto;
  position?: string;
  sizes: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}) {
  return (
    <span
      className="academy-photo-frame"
      data-fit="cover"
      data-photo-id={photo.id}
    >
      <img
        className="academy-photo-image"
        src={photo.src}
        srcSet={photo.srcSet}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        style={{ objectFit: "cover", objectPosition: position }}
      />
    </span>
  );
}
