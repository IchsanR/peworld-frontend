import React, { useState } from "react";
import LeftPanel from "../../../components/LeftPanel";
import Head from "next/head";
import styles from "../../../styles/LoginRegister.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const RecruiterRegister = () => {
	const router = useRouter();
	const [form, setForm] = useState({
		names: "",
		email: "",
		perusahaan: "",
		jabatan: "",
		phone: "",
		password: "",
		checkPassword: "",
		profile_pic: "",
	});

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			form.names == "" ||
			form.email == "" ||
			form.perusahaan == "" ||
			form.jabatan == "" ||
			form.phone == "" ||
			form.password == "" ||
			form.checkPassword == ""
		) {
			alert("Semua form wajib diisi");
		} else {
			const body = {
				names: form.names,
				email: form.email,
				perusahaan: form.perusahaan,
				jabatan: form.jabatan,
				phone: form.phone,
				password: form.password,
				checkPassword: form.checkPassword,
				profile_pic: form.profile_pic,
			};
			if (form.password.length < 5) {
				alert("Password minimal 5 karakter");
			} else {
				if (form.password !== form.checkPassword) {
					alert("Password tidak sama");
				} else {
					axios
						.post(
							`${process.env.NEXT_PUBLIC_BACKEND_URL}/recruiter/register`,
							body
						)
						.then((response) => {
							if (response.data.code == 500) {
								alert(response.data.message);
							} else {
								if (response) {
									// console.log(response);
									alert("Akun berhasil didaftarkan");
									router.push("/login/recruiter");
								}
							}
						})
						.catch((error) => {
							if (error) {
								// console.log(error);
								alert("Gagal membuat akun");
							}
						});
				}
			}
		}
	};

	return (
		<>
			<Head>
				<title>Recruiter Register</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/Logo.png" />
			</Head>
			<div className="container-fluid row">
				<LeftPanel />
				<div className="col pt-5">
					<div className="position-relative top-50 translate-middle-y col-11 ps-5 pt-5">
						<div>
							<p className={`my-3 fs-1 ${styles.helo}`}>Halo, Pewpeople</p>
							<p className={`${styles.subHelo}`}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
								euismod ipsum et dui rhoncus auctor.
							</p>
						</div>
						<div className="pt-5">
							<form onSubmit={(e) => onSubmit(e)}>
								<div className="mb-4">
									<label for="nameInput" className="form-label">
										Nama
									</label>
									<input
										type="text"
										className={`form-control ${styles.input}`}
										id="nameInput"
										placeholder="Masukan nama panjang"
										onChange={(e) =>
											setForm({ ...form, names: e.target.value })
										}
									/>
								</div>
								<div className="mb-4">
									<label for="exampleInputEmail1" className="form-label">
										Email
									</label>
									<input
										type="email"
										className={`form-control ${styles.input}`}
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Masukan alamat email"
										onChange={(e) =>
											setForm({ ...form, email: e.target.value })
										}
									/>
								</div>
								<div className="mb-4">
									<label for="companyInput" className="form-label">
										Perusahaan
									</label>
									<input
										type="text"
										className={`form-control ${styles.input}`}
										id="companyInput"
										placeholder="Masukan nama perusahaan"
										onChange={(e) =>
											setForm({ ...form, perusahaan: e.target.value })
										}
									/>
								</div>
								<div className="mb-4">
									<label for="positionInput" className="form-label">
										Jabatan
									</label>
									<input
										type="text"
										className={`form-control ${styles.input}`}
										id="positionInput"
										placeholder="Posisi di perusahaan anda"
										onChange={(e) =>
											setForm({ ...form, jabatan: e.target.value })
										}
									/>
								</div>
								<div className="mb-4">
									<label for="phoneNumber" className="form-label">
										No Handphone
									</label>
									<input
										type="text"
										className={`form-control ${styles.input}`}
										id="phoneNumber"
										aria-describedby="emailHelp"
										placeholder="Masukan no handphone"
										onChange={(e) =>
											setForm({ ...form, phone: e.target.value })
										}
									/>
								</div>
								<div className="mb-4">
									<label for="exampleInputPassword1" className="form-label">
										Kata sandi
									</label>
									<input
										type="password"
										className={`form-control ${styles.input}`}
										id="exampleInputPassword1"
										placeholder="Masukan kata sandi"
										onChange={(e) =>
											setForm({ ...form, password: e.target.value })
										}
									/>
								</div>
								<div className="mb-4">
									<label for="exampleInputPassword2" className="form-label">
										Konfirmasi kata sandi
									</label>
									<input
										type="password"
										className={`form-control ${styles.input}`}
										id="exampleInputPassword2"
										placeholder="Masukan konfirmasi kata sandi"
										onChange={(e) =>
											setForm({ ...form, checkPassword: e.target.value })
										}
									/>
								</div>
								<div className="mb-4">
									<button type="submit" className={`col-12 ${styles.buttons}`}>
										Daftar
									</button>
								</div>
								<div className="pb-4">
									<p className="text-center">
										Anda sudah punya akun?{" "}
										<span>
											<Link
												className={`${styles.link} ${styles.signLink}`}
												href="/login">
												Masuk disini
											</Link>
										</span>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RecruiterRegister;