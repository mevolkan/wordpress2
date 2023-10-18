/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

import { useState, useEffect } from "@wordpress/element";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const apiEndpoint = "https://skunk.local/wp-json/greeting/v1/fetch";
		const accessToken = "your-access-token";
		fetch(apiEndpoint, {
			headers: {
				Authorization: "Bearer ${accessToken}",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setGreeting(data);
			})
			.catch((error) => {
				console.error("Api Error:", error);
			});
	}, []);
	return (
		<p {...useBlockProps()}>
			{greeting || __("Loading...", "greeting-block-plugin")}
		</p>
	);
}
