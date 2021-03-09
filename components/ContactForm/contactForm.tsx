import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

interface Inputs {
	from_name: string;
	reply_to: string;
	message: string;
}

const ContactForm = () => {
	const { register, handleSubmit, errors, reset: resetForm } = useForm<Inputs>();
	const [isLoading, setIsLoading] = useState(false);

	//On submit, Send contact message
	const onSubmit = (data) => {
		setIsLoading(true);
		emailjs
			.send(
				process.env.NEXT_PUBLIC_SERVICE_ID,
				process.env.NEXT_PUBLIC_TEMPLATE_ID,
				data,
				process.env.NEXT_PUBLIC_USER_ID
			)
			.then(() => {
				toast.success("🚀 Success!");
				resetForm();
			})
			.catch(() => {
				toast.error("😢 Something Failed, Please Try later");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="container mx-auto grid  grid-cols-1 md:grid-cols-2 gap-4 p-4  ">
			<div className="col-span-1">
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="from_name"
					placeholder="Name"
					defaultValue=""
					ref={register({ required: true })}
					className={`${styles.inputForm} ${errors.from_name ? styles.errorInputForm : ""}`}
				></input>
			</div>
			<div className="col-span-1">
				<label htmlFor="email">E-Mail:</label>
				<input
					type="email"
					id="email"
					name="reply_to"
					placeholder="E-mail"
					defaultValue=""
					ref={register({
						required: true,
						pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i, message: "invalid Email Format" },
					})}
					className={`${styles.inputForm} ${errors.reply_to ? styles.errorInputForm : ""}`}
				></input>
			</div>
			<div className="col-span-full">
				<label htmlFor="message">Message:</label>
				<textarea
					id="message"
					name="message"
					placeholder="Message..."
					defaultValue=""
					rows={8}
					ref={register({ required: true })}
					className={`${styles.inputForm} ${errors.message ? styles.errorInputForm : ""}`}
				/>
			</div>
			<div className="col-span-full center mx-auto">
				<button
					type="submit"
					className="bg-blue-100 disabled:opacity-30 text-blue-700 text-base font-semibold px-6 py-2 rounded-xl"
					disabled={isLoading}
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default ContactForm;
