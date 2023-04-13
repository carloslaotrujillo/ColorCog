"use client";
import NextImage from "next/image";
import React, { useState } from "react";
import style from "./Form.module.css";
import loader from "../assets/loader.gif";
import ImageUploading from "react-images-uploading";

import fetchClarifaiAPI from "./utils/fetchClarifaiAPI";
import generateRandomImageUrl from "./utils/generateRandomImageUrl";

function Form() {
	const [colors, setColors] = useState();
	const [inputURL, setInputUrl] = useState();
	const [imageURL, setImageUrl] = useState(generateRandomImageUrl);

	const [imageLoading, setImageLoading] = useState(true);
	const [colorsLoading, setColorsLoading] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (inputURL === imageURL) return;

		setImageLoading(true);

		const canLoadImage = (url) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = url;
				img.onload = () => resolve(true);
				img.onerror = () => resolve(false);
			});
		};

		canLoadImage(inputURL).then((result) => {
			if (result) {
				setImageLoading(false);
				setImageUrl(inputURL);
			} else {
				setImageLoading(false);
				alert("Please enter a valid URL");
			}
		});
	};

	const randomPhoto = (event) => {
		event.preventDefault();
		setInputUrl("");
		setImageLoading(true);
		setImageUrl(generateRandomImageUrl);
		setColors();
	};

	const handleImageLoad = () => {
		setImageLoading(false);
		setColorsLoading(true);
		// Improve this
		(async function fetchColors() {
			const results = await fetchClarifaiAPI(imageURL);
			setColors(results.outputs[0].data.colors);
			setColorsLoading(false);
		})();
	};

	const [uploadedImage, setUploadedImage] = useState([]);
	const maxNumber = 1;
	const onChange = (imageList, addUpdateIndex) => {
		setImageLoading(true);
		setUploadedImage(imageList);
		setImageUrl(imageList[0].data_url);
	};

	return (
		<>
			<h2 style={{ marginBottom: "20px" }}>Paste your photo URL or upload your own</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="url"
					value={inputURL}
					onChange={(event) => setInputUrl(event.target.value)}
					style={{ marginBottom: "20px" }}
					required
				/>
				<button type="submit">Submit</button>
				<button onClick={(event) => randomPhoto(event)}>Random Photo</button>
				<ImageUploading
					value={uploadedImage}
					onChange={onChange}
					maxNumber={maxNumber}
					dataURLKey="data_url"
					acceptType={["jpg", "png", "gif"]}
				>
					{({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => (
						<div className="upload__image-wrapper">
							<button style={isDragging ? { color: "red" } : undefined} onClick={onImageUpload} {...dragProps}>
								Click or Drop here
							</button>
							{errors && (
								<div>
									{errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
									{errors.acceptType && <span>Your selected file type is not allow</span>}
									{errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
									{errors.resolution && <span>Selected file is not match your desired resolution</span>}
								</div>
							)}
						</div>
					)}
				</ImageUploading>
			</form>

			<div className={style.imageContainer}>
				{imageLoading && (
					<NextImage src={loader} alt="loader" width={100} height={100} style={{ marginTop: "200px" }} />
				)}
				{imageURL && (
					<NextImage src={imageURL} alt="NextImage" key={imageURL} onLoad={handleImageLoad} width={1200} height={630} />
				)}
			</div>
			<div className={style.colorContainer}>
				{colorsLoading && <NextImage src={loader} alt="loader" width={75} height={75} style={{ marginTop: "50px" }} />}
				{colors &&
					!colorsLoading &&
					colors.map((color) => {
						return (
							<div className={style.color} key={color.raw_hex} style={{ backgroundColor: color.w3c.hex }}>
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
