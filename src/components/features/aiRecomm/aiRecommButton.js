'use client';

// components/features/aiRecomm/AiRecommButton.js
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AiRecommButton() {
  const router = useRouter();
  // Function name must match the import
  // Function is defined within the component
  const handleClick = () => {
    router.push('/AIRecommendation-1');
  };

  return (
    <button
      onClick={handleClick}
      className="hover:scale-115 hover:rounded-3xl transition duration-300 hover:cursor-pointer z-50"
    >
      <Image
        src="/aiRecommButton.svg"
        alt="Button icon"
        width={50}
        height={50}
        objectFit="contain"
      />
    </button>
  );
}
