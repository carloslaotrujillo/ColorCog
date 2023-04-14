"use client";
import NextImage from "next/image";
import React, { useState } from "react";
import style from "./Form.module.css";
import loader from "../assets/loader.gif";
import ImageUploading from "react-images-uploading";

import fetchColors from "./utils/fetchColors";
import { generateRandomImageUrl, canLoadImage } from "./utils/utils";

const IMAGE_WIDTH = 960;
const IMAGE_HEIGHT = 540;
const UPLOAD_MAX_NUMBER = 1;

function Form() {
	const [colors, setColors] = useState();
	const [inputURL, setInputUrl] = useState();
	const [imageType, setImageType] = useState();
	const [imagePayload, setImagePayload] = useState();
	const [uploadedImage, setUploadedImage] = useState([]);
	const [imageLoading, setImageLoading] = useState(false);
	const [colorsLoading, setColorsLoading] = useState(false);

	const reset = () => {
		setColors();
		setInputUrl("");
		setImagePayload();
		setImageLoading(true);
	};

	const handleSubmit = (action) => {
		console.log("Function parameters:", arguments);
		reset();
		switch (action) {
			case "URL":
				canLoadImage(inputURL).then((result) => {
					if (result) {
						setImageLoading(false);
						setImageType("url");
						setImagePayload(inputURL);
					} else {
						setImageLoading(false);
						alert("Please enter a valid URL");
					}
				});
				break;
			case "RANDOM":
				setImageType("url");
				setImagePayload(generateRandomImageUrl(IMAGE_WIDTH, IMAGE_HEIGHT));
				break;
			// WIP
			case "UPLOAD":
				onImageUploadChange();
			default:
				break;
		}
	};

	const handleImageLoad = () => {
		setImageLoading(false);
		setColorsLoading(true);
		// Improve this (revisit logic)
		(async () => {
			const results = await fetchColors(imageType, imagePayload);
			setColors(results.outputs[0].data.colors);
			setColorsLoading(false);
		})();
	};

	const onImageUploadChange = (imageList) => {
		reset();
		setImageType("base64");
		setUploadedImage(imageList);
		setImagePayload(imageList[0].data_url);
	};

	return (
		<>
			<h2 style={{ marginBottom: "20px", textAlign: "center" }}>Paste your photo URL or upload your own</h2>
			<form>
				<input
					type="url"
					value={inputURL}
					onChange={(event) => setInputUrl(event.target.value)}
					style={{ marginBottom: "20px" }}
					required
				/>
				<button onClick={() => handleSubmit("URL")}>Submit</button>
				<button onClick={() => handleSubmit("RANDOM")}>Random Photo</button>
			</form>
			<ImageUploading
				value={uploadedImage}
				// Use the handleSubmit function to upload the image (WIP)
				// On Drag gives error when a img is already uploaded by drag at first
				onChange={onImageUploadChange}
				maxNumber={UPLOAD_MAX_NUMBER}
				dataURLKey="data_url"
				acceptType={["jpg", "png", "gif"]}
			>
				{({ imageList, onImageUpdate, isDragging, dragProps, errors }) => (
					<div className="upload__image-wrapper">
						<button style={isDragging ? { color: "red" } : undefined} onClick={onImageUpdate} {...dragProps}>
							Click or Drop here
						</button>
						{errors && (
							<div>
								{errors.maxNumber && <span>Number of selected images exceed {UPLOAD_MAX_NUMBER}</span>}
								{errors.acceptType && <span>Your selected file type is not allow</span>}
								{errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
								{errors.resolution && <span>Selected file is not match your desired resolution</span>}
							</div>
						)}
					</div>
				)}
			</ImageUploading>
			{imageLoading && <NextImage src={loader} alt="loader" width={100} height={100} style={{ marginTop: "200px" }} />}
			<div className={style.imageContainer}>
				{imagePayload && (
					<NextImage
						src={imagePayload}
						alt="NextImage"
						key={imagePayload}
						onLoad={handleImageLoad}
						width={IMAGE_WIDTH}
						height={IMAGE_HEIGHT}
					/>
				)}
			</div>
			<div className={style.colorContainer}>
				{colorsLoading && <NextImage src={loader} alt="loader" width={75} height={75} style={{ marginTop: "10px" }} />}
				{colors &&
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
