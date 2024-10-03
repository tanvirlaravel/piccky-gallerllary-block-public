import useImage from "../hooks/useImage";

function ImageThumbnail(props) {
	const image = useImage(props.imageId);

	return image?.source_url ? (
		<img
			src={image.source_url}
			style={{
				display: "block",
				width: "100%",
				height: props.height || 150,
				objectFit: "cover",
			}}
			onClick={props.onClick}
			className={props.className}
		/>
	) : null;
}
export default ImageThumbnail;
