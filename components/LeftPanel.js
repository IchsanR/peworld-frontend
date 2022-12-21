import React from "react";
import Image from "next/image";
import styles from "../styles/LeftPanel.module.css";

const LeftPanel = () => {
	return (
		<>
			<div className={`col ${styles.leftPanel}`}>
				<Image
					src="/LogoFull.png"
					className={`${styles.logo}`}
					alt=""
					width={86}
					height={24}
				/>
				<div className={`position-absolute top-50 ${styles.desc}`}>
					<h1 className={`${styles.sideDesc}`}>
						Temukan developer
						<br />
						berbakat & terbaik
						<br />
						di berbagai bidang
						<br />
						keahlian
					</h1>
				</div>
				<div className={`position-relative`}>
					<div className={`position-relative my-4 ms-5 ${styles.bg}`}>
						<Image src="/Layer1Login.png" fill alt="" />
					</div>
					<Image
						src="/backgroundLogin.png"
						fill
						alt=""
						className={`ps-5 ${styles.mainbg}`}
					/>
				</div>
			</div>
		</>
	);
};

export default LeftPanel;
