"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import fav_colors from "../../assets/fav_color.gif";
import style from "./style.module.css";

function Navbar() {
	return (
		<nav>
			<Link href="/">
				<Image src={fav_colors} alt="Logo" className={style.image} priority />
			</Link>
			<Link href="/register">
				<button>Register</button>
			</Link>
			<Link href="/login">
				<button>Log In</button>
			</Link>
		</nav>
	);
}

export default Navbar;
