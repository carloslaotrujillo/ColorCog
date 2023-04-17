import React from "react";
import Link from "next/link";
import Image from "next/image";
import fav_colors from "../../assets/fav_color.gif";
import style from "./Navbar.module.css";

function Navbar() {
	return (
		<nav>
			<Link href="/">
				<Image src={fav_colors} alt="colors" className={style.image} />
			</Link>
		</nav>
	);
}

export default Navbar;
