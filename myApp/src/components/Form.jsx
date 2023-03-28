import React, { useState } from "react";
import CircularLinkedList from "../utils/CircularLinkedList";

const websitesImagesUrl = ["https://loremflickr.com/640/360?lock=12"];

const imagesList = new CircularLinkedList();
websitesImagesUrl.forEach((url) => imagesList.append(url));

const USER_ID = "krloslao90";
const APP_ID = "color-precog";
const MODEL_ID = "color-recognition";
const PAT = "3f8003a72aee4c9cb2c46af28832f94d";

function Form() {
	const [colors, setColors] = useState();
	const [imageURL, setImageUrl] = useState(imagesList.head.value);

	const handleSubmit = (event) => {
		event.preventDefault();

		const raw = JSON.stringify({
			user_app_id: {
				user_id: USER_ID,
				app_id: APP_ID,
			},
			inputs: [
				{
					data: {
						image: {
							url: imageURL,
						},
					},
				},
			],
		});

		const requestOptions = {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: "Key " + PAT,
			},
			body: raw,
		};

		fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setColors(result.outputs[0].data.colors);
			})
			.catch((error) => console.log("error", error));
	};

	const reset = () => {
		setColors();
		setImageUrl(imagesList.head.next.value);
		imagesList.head = imagesList.head.next;
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input type="text" value={imageURL} onChange={(event) => setImageUrl(event.target.value)} />
				<button type="submit">Submit</button>
			</form>
			<div>{colors && <button onClick={() => reset()}>Try Again!</button>}</div>

			<div>
				<h1>Result</h1>
				{imageURL ? <img src={imageURL} alt="Image" /> : <p>Loading...</p>}
				{colors &&
					colors.map((color) => {
						return (
							<div key={color.raw_hex} style={{ backgroundColor: color.w3c.hex }}>
								<p>{color.w3c.name}</p>
								<p>{color.w3c.hex}</p>
							</div>
						);
					})}
			</div>
		</>
	);
}

export default Form;
