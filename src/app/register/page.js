"use client";
import swal from "sweetalert";
import registerUser from "./utils";
import React, { useState } from "react";
import styles from "./style.module.css";
import { Vortex } from "react-loader-spinner";

function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [formControlDisable, setFormControlDisable] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setFormControlDisable(true);

		const response = await registerUser(name, email, password);

		if (response.status === 200) {
			setIsLoading(false);
			await swal({
				title: "User registered succesfully!",
				icon: "success",
				button: "OK",
			});
			// location.href = "/";
		} else {
			const data = await response.json();
			setIsLoading(false);
			swal({
				title: data.message,
				icon: "error",
				button: "OK",
			});
			setFormControlDisable(false);
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={(e) => handleSubmit(e, name, email, password)}>
				<h1>Register</h1>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className={styles.input}
						placeholder="John Doe"
						disabled={formControlDisable}
						required
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={styles.input}
						placeholder="john@email.com"
						disabled={formControlDisable}
						required
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={styles.input}
						placeholder="**********"
						disabled={formControlDisable}
						required
					/>
				</label>
				<button type="submit" className={styles.button} disabled={formControlDisable}>
					Register
				</button>
				<Vortex
					visible={isLoading}
					height="75"
					width="75"
					ariaLabel="vortex-loading"
					wrapperClass="vortex-wrapper"
					colors={["red", "green", "blue", "yellow", "magenta"]}
				/>
			</form>
		</div>
	);
}

export default SignUp;
