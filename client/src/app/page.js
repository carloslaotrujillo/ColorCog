import Link from "next/link";
import Image from "next/image";
import styles from './page.module.css';
import colors_gif from "./assets/colors.gif";


export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/color-recognition">Color Recognition</Link> 
      <Image src={colors_gif} alt="colors" style={{ borderRadius: "50%" }} />
    </main>
  )
}
