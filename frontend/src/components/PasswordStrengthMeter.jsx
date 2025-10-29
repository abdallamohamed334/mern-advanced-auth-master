import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PasswordStrengthMeter = ({ password }) => {
	const [strength, setStrength] = useState(0);
	const [feedback, setFeedback] = useState("");

	useEffect(() => {
		calculateStrength(password);
	}, [password]);

	const calculateStrength = (password) => {
		let score = 0;
		let feedbackMessages = [];

		if (!password) {
			setStrength(0);
			setFeedback("");
			return;
		}

		// Length check
		if (password.length >= 8) score += 1;
		else feedbackMessages.push("كلمة المرور يجب أن تكون 8 أحرف على الأقل");

		// Lowercase check
		if (/[a-z]/.test(password)) score += 1;
		else feedbackMessages.push("أضف أحرف صغيرة");

		// Uppercase check
		if (/[A-Z]/.test(password)) score += 1;
		else feedbackMessages.push("أضف أحرف كبيرة");

		// Numbers check
		if (/[0-9]/.test(password)) score += 1;
		else feedbackMessages.push("أضف أرقام");

		// Special characters check
		if (/[^A-Za-z0-9]/.test(password)) score += 1;
		else feedbackMessages.push("أضف رموز خاصة");

		setStrength(score);
		setFeedback(feedbackMessages.join("، "));
	};

	const getStrengthColor = () => {
		switch (strength) {
			case 0:
			case 1:
				return "bg-red-500";
			case 2:
				return "bg-orange-500";
			case 3:
				return "bg-yellow-500";
			case 4:
				return "bg-blue-500";
			case 5:
				return "bg-green-500";
			default:
				return "bg-gray-300";
		}
	};

	const getStrengthText = () => {
		switch (strength) {
			case 0:
				return "ضعيفة جداً";
			case 1:
				return "ضعيفة";
			case 2:
				return "متوسطة";
			case 3:
				return "جيدة";
			case 4:
				return "قوية";
			case 5:
				return "قوية جداً";
			default:
				return "";
		}
	};

	if (!password) return null;

	return (
		<motion.div
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: "auto" }}
			className="space-y-2"
		>
			<div className="flex items-center justify-between text-sm">
				<span className="text-gray-600">قوة كلمة المرور:</span>
				<span className={`font-medium ${
					strength <= 2 ? "text-red-600" :
					strength === 3 ? "text-yellow-600" :
					"text-green-600"
				}`}>
					{getStrengthText()}
				</span>
			</div>
			
			<div className="w-full bg-gray-200 rounded-full h-2">
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: `${(strength / 5) * 100}%` }}
					transition={{ duration: 0.5 }}
					className={`h-2 rounded-full transition-all duration-500 ${getStrengthColor()}`}
				/>
			</div>
			
			{feedback && (
				<p className="text-xs text-gray-500 text-right">
					{feedback}
				</p>
			)}
		</motion.div>
	);
};

export default PasswordStrengthMeter;