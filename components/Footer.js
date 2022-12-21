import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
	return (
		<>
			<div className={`container-fluid row ${styles.footer} col-12`}>
				<div className="col-md-4 my-md-5 ms-md-5">
					<Image
						src="/LogoFull.png"
						width={127}
						height={35}
						alt=""
						className={`my-3 ms-5`}
					/>
					<p className={`ms-5 mb-4 ${styles.texts}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
						ipsum et dui rhoncus auctor.
					</p>
				</div>
				<div className={`col-10 ${styles.navFoot}`}>
					<p className="me-auto py-3">2022 Peworld. All right reserved</p>
					<p className="py-3 pe-5">Telepon</p>
					<p className="py-3 ps-5">Email</p>
				</div>
			</div>
		</>
	);
};

export default Footer;
