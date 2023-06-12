"use client";
import NextImage from "next/image";
import style from "./style.module.css";
import React, { useState } from "react";
import Loader from "../assets/loader.gif";
import UploadIcon from "../assets/upload.png";
import { fetchUrlColors, fetchFileColors, generateRandomImageUrl, canLoadImage, DataList } from "./utils/utils";

const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 480;

function ColorRecognition() {
	const [colors, setColors] = useState([]);
	const [inputUrl, setInputUrl] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const [fileSrc, setFileSrc] = useState("");
	const [imageType, setImageType] = useState("");
	const [dragover, setDragover] = useState(false);
	const [imageLoading, setImageLoading] = useState(false);
	const [colorsLoading, setColorsLoading] = useState(false);

	const handleSubmit = (action, event) => {
		event.preventDefault();

		setColors([]);
		setInputUrl("");
		setImageSrc("");
		setImageType("");
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
				handleFileSubmit(event.target.files[0]);
				break;
			case "UPLOAD_DROP":
				handleFileSubmit(event.dataTransfer.files[0]);
				break;
			default:
				break;
		}
	};

	const loadColors = () => {
		setImageLoading(false);
		setColorsLoading(true);
		(async () => {
			const results = await fetchColors();
			setColors(results.outputs[0].data.colors);
			setColorsLoading(false);
		})();
	};

	const fetchColors = async () => {
		let data;
		switch (imageType) {
			case "url":
				data = await fetchUrlColors(imageSrc);
				return data;
			case "base64":
				data = await fetchFileColors(fileSrc);
				return data;
			default:
				break;
		}
	};

	const handleFileSubmit = (file) => {
		if (file) {
			setFileSrc(file);
			setImageType("base64");
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (event) => {
				setImageSrc(event.target.result);
				setImageLoading(false);
			};
		}
	};

	const addColor = (color) => {
		console.log(color.w3c.name);
		console.log(color.w3c.hex);
	};

	return (
		<>
			<h2 className={style.h2}>Paste your photo URL or upload your own</h2>
			<div className={style.formContainer}>
				<form>
					<input
						type="url"
						value={inputUrl}
						pattern="https://.*"
						placeholder="https://example.com/image.jpg"
						onChange={(event) => setInputUrl(event.target.value)}
						list="exampleList"
					/>
					<DataList width={IMAGE_WIDTH} height={IMAGE_HEIGHT} id="exampleList" />
					<div className={style.submitContainer}>
						<button onClick={(event) => handleSubmit("URL", event)}>Submit</button>
						<button onClick={(event) => handleSubmit("RANDOM", event)}>Random Photo</button>
						<div className={style.uploadContainer}>
							<input
								type="file"
								id="file-input"
								name="image"
								onChange={(event) => handleSubmit("UPLOAD_FILE", event)}
							/>
							<label htmlFor="file-input">Choose a file</label>
						</div>
					</div>
					<div
						className={style.dropContainer}
						onDrop={(event) => {
							handleSubmit("UPLOAD_DROP", event);
							setDragover(false);
						}}
						onDragOver={(event) => {
							event.preventDefault();
							setDragover(true);
						}}
						onDragLeave={(event) => {
							event.preventDefault();
							setDragover(false);
						}}
						style={{ backgroundColor: dragover ? "#ffa600" : "transparent" }}
					>
						<NextImage src={UploadIcon} width={50} height={50} />
						<p>Drop your image here</p>
					</div>
				</form>
			</div>
			<div className={style.imageContainer} style={{ maxWidth: IMAGE_WIDTH }}>
				{imageLoading && <NextImage src={Loader} alt="loader" width={100} height={100} className={style.imageLoader} />}
				{imageSrc && (
					<NextImage
						src={imageSrc}
						alt="Image"
						key={imageSrc}
						onLoad={loadColors}
						width={IMAGE_WIDTH}
						height={IMAGE_HEIGHT}
						priority={true}
						className={style.Image}
					/>
				)}
			</div>
			<div className={style.colorsContainer} style={{ maxWidth: IMAGE_WIDTH }}>
				{colorsLoading && <NextImage src={Loader} alt="loader" width={75} height={75} className={style.colorsLoader} />}
				{colors &&
					colors.map((color) => {
						return (
							<button
								className={style.Color}
								key={color.raw_hex}
								style={{ backgroundColor: color.w3c.hex }}
								onClick={() => addColor(color)}
							>
								<p>{color.w3c.name}</p>
								<p>{color.w3c.hex}</p>
							</button>
						);
					})}
			</div>
		</>
	);
}

export default ColorRecognition;
