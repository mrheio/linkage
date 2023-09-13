import Image from 'next/image';

const NotFound = () => {
	return (
		<Image
			src="/are-you-lost-baby-girl.jpg"
			alt="Are you lost, baby girl?"
			width={1000}
			height={1000}
		/>
	);
};

export default NotFound;
