import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { Icon } from "@wordpress/components";
import "./editor.scss";
import metadata from "./block.json";
import ImageThumbnail from "../../components/imageThumbnail";
import useImage from "../../hooks/useImage";


const ALLOWED_MEDIA_TYPES = ["image"];
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { imageId } = attributes;
	const image = useImage(imageId);

	const imageSelected = !!imageId && !!image?.source_url;

	return (
		<>
			<div {...blockProps}>
				{!!imageSelected && <ImageThumbnail imageId={imageId} />}
				{!imageSelected && (
					<div
						style={{
							display: "flex",
							height: 150,
							width: "100%",
							background: "#fff",
						}}
					>
						<Icon icon="format-image" style={{ margin: "auto" }} />
					</div>
				)}
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(media) => {
							setAttributes({ imageId: media.id });
						}}
						allowedTypes={["image"]}
						render={({ open }) => {
							return (
								<button className="media-select" onClick={open}>
									{imageSelected
										? __("Replace an Image", metadata.textdomain)
										: __("Select an Image", metadata.textdomain)}
								</button>
							);
						}}
						value={imageId}
					/>
				</MediaUploadCheck>
			</div>
		</>
	);
}
