import Link from "next/link";
import Image from "next/image";
import colors_gif from "./assets/colors.gif";

export default function Home() {
	return (
		<main>
			<Image src={colors_gif} alt="colors" style={{ borderRadius: "50%" }} />
		</main>
	);
}
