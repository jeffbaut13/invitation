const title = "Revelacion de nuestro bebe";
const description = "Acompañanos en la revelacion de nuestro hermoso bebe";
const image = "/img-500.png";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const imageUrl = siteUrl ? `${siteUrl}${image}` : image;

export default function Head() {
	return (
		<>
			<title>{title}</title>
			<meta name="description" content={description} />

			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="Revelacion de nuestro bebe" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={imageUrl} />
			<meta property="og:image:secure_url" content={imageUrl} />
			<meta property="og:image:type" content="image/png" />
			<meta property="og:image:width" content="500" />
			<meta property="og:image:height" content="500" />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={imageUrl} />
		</>
	);
}
