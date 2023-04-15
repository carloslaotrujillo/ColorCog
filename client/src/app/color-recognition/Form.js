"use client";
import NextImage from "next/image";
import React, { useState } from "react";
import style from "./Form.module.css";
import loader from "../assets/loader.gif";

import { fetchColors, generateRandomImageUrl, canLoadImage, handleFileDrop, handleFileSelect } from "./utils/utils";

const IMAGE_WIDTH = 960;
const IMAGE_HEIGHT = 540;

function Form() {
	const [colors, setColors] = useState();
	const [inputUrl, setInputUrl] = useState();
	const [imageSrc, setImageSrc] = useState();
	const [imageType, setImageType] = useState();
	const [imageLoading, setImageLoading] = useState(false);
	const [colorsLoading, setColorsLoading] = useState(false);

	const handleSubmit = (action, event) => {
		event.preventDefault();

		setColors();
		setInputUrl();
		setImageSrc();
		setImageLoading(true);

		switch (action) {
			case "URL":
				canLoadImage(inputUrl).then((result) => {
					if (result) {
						setImageType("url");
						setImageSrc(inputUrl);
						setImageLoading(false);
					} else {
						setImageLoading(false);
						alert("Please enter a valid URL");
					}
				});
				break;
			case "RANDOM":
				setImageType("url");
				setImageSrc(generateRandomImageUrl(IMAGE_WIDTH, IMAGE_HEIGHT));
				break;
			case "UPLOAD_FILE":
				const fileUpload = event.target.files[0];
				handleFileSubmit(fileUpload);
				break;
			// WIP
			case "UPLOAD_DROP":
				const fileDrop = event.dataTransfer.files[0];
				handleFileSubmit(fileDrop);
				break;
			default:
				break;
		}
	};

	const loadColors = () => {
		setImageLoading(false);
		setColorsLoading(true);
		(async () => {
			const results = await fetchColors(imageType, imageSrc);
			setColors(results.outputs[0].data.colors);
			setColorsLoading(false);
		})();
	};

	const handleFileSubmit = (file) => {
		if (file) {
			setImageType("base64");
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (event) => {
				setImageSrc(event.target.result);
			};
		}
	};

	return (
		<>
			<h2 style={{ marginBottom: "20px", textAlign: "center" }}>Paste your photo URL or upload your own</h2>
			<div className={style.formContainer}>
				<form>
					<input
						type="url"
						value={inputUrl}
						onChange={(event) => setInputUrl(event.target.value)}
						style={{ marginBottom: "20px" }}
					/>
					<button onClick={(event) => handleSubmit("URL", event)}>Submit</button>
					<button onClick={(event) => handleSubmit("RANDOM", event)}>Random Photo</button>
					<div>
						<input type="file" onChange={(event) => handleSubmit("UPLOAD_FILE", event)} />
					</div>
					<div
						onDrop={(event) => {
							handleSubmit("UPLOAD_DROP", event);
						}}
						onDragOver={(event) => event.preventDefault()}
					></div>
				</form>
			</div>
			{imageLoading && <NextImage src={loader} alt="loader" width={100} height={100} style={{ marginTop: "200px" }} />}
			<div className={style.imageContainer}>
				{imageSrc && (
					<NextImage
						src={imageSrc}
						alt="NextImage"
						key={imageSrc}
						onLoad={loadColors}
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
