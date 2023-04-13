import React from "react";
import Link from "next/link";
import Image from "next/image";
import fav_colors from "../assets/fav_color.gif";
import style from "./Navbar.module.css";

function Navbar() {
	return (
		<nav>
			<div>
				<Link href="/">
					<Image src={fav_colors} alt="colors" className={style.image} />
				</Link>
			</div>
			<div>
				<Link href="/">
					<button>Home</button>
				</Link>
				<Link href="/color-recognition">
					<button>Color Recognition</button>
				</Link>
			</div>
			<div>
				<Link href="/">
					<button>Sign In</button>
				</Link>
				<Link href="/">
					<button>Register</button>
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
