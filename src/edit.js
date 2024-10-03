import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	BlockControls,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton, Icon } from "@wordpress/components";
import "./editor.scss";
import metadata from "./block.json";
import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import ImageThumbnail from "./components/imageThumbnail";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(
		{
			className: "piccky-gallery-inner-blocks",
		},
		{
			allowedBlocks: ["tanvir/piccky-image"],
		},
	);
	const [editMode, setEditMode] = useState(true);
	const innerBlocks = useSelect(
		(select) => {
			const { getBlocksByClientId } = select("core/block-editor");
			const block = getBlocksByClientId(props.clientId)?.[0];
			return block?.innerBlocks;
		},
		[props.clientId],
	);
	const [previewModeImage, setPreviewModeImage] = useState({
		imageId: innerBlocks?.[0]?.attributes?.imageId,
		blockId: innerBlocks?.[0]?.clientId,
	});

	// console.log(innerBlocks);

	return (
		<>
			<div {...blockProps}>
				{editMode && (
					<div className="edit-mode">
						<span className="piccy-label">
							{__("Picky Image Gallery", metadata.textdomain)}
						</span>
						<div {...innerBlockProps} />
					</div>
				)}
				{!editMode && (
					<>
						<div className="preview-mode">
							{(innerBlocks || []).map((innerBlock) => {
								return (
									<ImageThumbnail
										key={innerBlock.clientId}
										imageId={innerBlock.attributes.imageId}
										height={75}
										onClick={() => {
											setPreviewModeImage({
												imageId: innerBlock.attributes.imageId,
												blockId: innerBlock.clientId,
											});
										}}
										className={`thumb ${innerBlock.clientId === previewModeImage.blockId ? "selected" : "" } `}
									/>
								);
							})}
						</div>
						<div>
							<ImageThumbnail
								imageId={previewModeImage.imageId}
								height="initial"
							/>
						</div>
					</>
				)}
			</div>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={
							editMode ? (
								<Icon icon="welcome-view-site" />
							) : (
								<Icon icon="edit" />
							)
						}
						label={
							editMode
								? __("Preivew Gallery", metadata.textdomain)
								: __("Edit Gallery", metadata.textdomain)
						}
						onClick={() => {
							setEditMode((prevState) => !prevState);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
