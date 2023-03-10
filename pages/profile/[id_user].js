import Head from "next/head";
import Image from "next/image";
import { React, useEffect, useState } from "react";
import ProfileTabs from "../../components/ProfileTabs";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import Link from "next/link";
import { protectRoute } from "../../HOC/protectedRoute";

export async function getStaticProps(context) {
	try {
		const { id_user } = context.params;
		const response = await axios({
			method: "GET",
			url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id_user}`,
		});
		return {
			props: {
				data: response.data.data.rows,
			},
			revalidate: 10,
			notFound: false,
		};
	} catch (error) {
		return {
			props: {
				data: null,
			},
			revalidate: 10, // 60 second
			notFound: true,
		};
	}
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
	const response = await axios({
		method: "GET",
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
	});

	const paths = response.data.data.rows.map((item) => {
		return { params: { id_user: item.id_user.toString() } };
	});
	return {
		paths,
		fallback: "blocking", // can also be true or 'blocking'
	};
}

const Profile = (props) => {
	const data = props.data[0];

	const [userData, setUserData] = useState({
		isLoading: true,
		data: {},
	});

	const userRole = userData.data.levels;
	const users = data.id_user;
	const self = userData.data.id_user;

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("data"));

		if (user) {
			setUserData({ ...userData, isLoading: false, data: user });
		}
	}, []);

	return (
		<>
			<Head>
				<title>Profile</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/Logo.png" />
			</Head>
			<div className="container-fluid row">
				<div className="position-absolute translate-middle-y ps-5 my-5">
					<div className="row col-11 ms-5 position-absolute my-5">
						<div className=" col-md-3 col-9 me-md-4 mb-md-0 mb-3 position-relative">
							<section className={`${styles.cards} p-3`}>
								<Image
									src={`${data.profile_pic.split("|&&|")[0]}`}
									width={135}
									height={135}
									className={`mx-auto d-block my-3 ${styles.profileImg}`}
									priority="true"
									alt={`Profile picture`}
								/>
								<h4>{data.names}</h4>
								<p>{data.job_desc}</p>
								{!data.domisili ? (
									<></>
								) : (
									<div className="row">
										<Image
											src="/map.png"
											width={14}
											height={14}
											className="col-auto"
											alt="Domisili"
										/>
										<p
											className={`col-auto ${styles.text} ${styles.textAddress}`}>
											{data.domisili}
										</p>
									</div>
								)}
								<p className={`${styles.text}`}>{data.tempatkerja}</p>
								<p className={`${styles.text}`}>{data.description}</p>
								{userRole === 0 ? (
									<Link
										href={`/hire/${data.id_user}`}
										className={`text-light ${styles.links}`}>
										<button className={`col-12 ${styles.searchBtn}`}>
											hire
										</button>
									</Link>
								) : self === users ? (
									<Link
										href={`/profile/editprofile/${data.id_user}`}
										className={`text-light ${styles.links}`}>
										<button className={`col-12 ${styles.searchBtn}`}>
											Edit Profile
										</button>
									</Link>
								) : (
									<></>
								)}
								<div className="my-3">
									<h4>Skill</h4>
									{data.skill != null ? (
										data.skill.split(",").map((item, index) => (
											<button
												key={index}
												className={`col-4 m-1 p-1 ${styles.btnSkills}`}>
												{item}
											</button>
										))
									) : (
										<h3>No skill</h3>
									)}
								</div>
								<div className="row">
									<Image
										src="/mail.png"
										width={18}
										height={18}
										alt=""
										className="col-auto"
									/>
									<p
										className={`col-auto ${styles.text} ${styles.textAddress}`}>
										{data.email}
									</p>
								</div>
								<div className="row">
									<Image
										src="/instagram.png"
										width={18}
										height={18}
										alt=""
										className="col-auto"
									/>
									<p
										className={`col-auto ${styles.text} ${styles.textAddress}`}>
										@louistomlinson
									</p>
								</div>
							</section>
						</div>
						<div className="position-relative col-md-8 col-9 ms-md-4">
							<ProfileTabs />
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.bgUngu} position-relative top-0`}></div>
			<div className={`${styles.bgPutih}`}></div>
		</>
	);
};

Profile.navbar = "L2";

export default protectRoute(Profile);
