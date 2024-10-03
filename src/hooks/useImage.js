import { useSelect } from "@wordpress/data";

function useImage(imageId) {
	const image = useSelect(
		(select) => {
			const data = select("core").getEntityRecord(
				"postType",
				"attachment",
				imageId,
			);
			return data;
		},
		[imageId],
	);
	return image;
}
export default useImage;
