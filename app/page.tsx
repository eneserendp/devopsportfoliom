'use client';

import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#2B2D3A] m-0 p-0 relative overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-[#363846] px-4 sm:px-8 py-3 sm:py-4 flex items-center gap-2 border-b border-[#404252]">
        <div className="flex gap-2 sm:gap-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#FF5F56] border-2 sm:border-4 border-[#E0443E] hover:opacity-80 transition-opacity cursor-pointer shadow-lg"></div>
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#FFBD2E] border-2 sm:border-4 border-[#DEA123] hover:opacity-80 transition-opacity cursor-pointer shadow-lg"></div>
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#27C93F] border-2 sm:border-4 border-[#1AAB29] hover:opacity-80 transition-opacity cursor-pointer shadow-lg"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-[#FFFFFF] text-sm sm:text-lg font-mono font-bold tracking-wide">
            enes@portfolio ~ %
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-76px)] p-4 sm:p-8">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 w-full max-w-6xl mx-auto">
          <div
            className={`${poppins.className} text-center md:text-left w-full md:w-2/3`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center md:items-baseline">
                <span className="text-[#FFFFFF] text-[28px] sm:text-[32px] md:text-[40px] font-extrabold tracking-wide drop-shadow-lg">
                  Merhaba Ben
                </span>
                <span className="text-[#4A9EFF] text-[28px] sm:text-[32px] md:text-[40px] font-extrabold md:ml-4 drop-shadow-lg">
                  <TypeAnimation
                    sequence={[
                      'Enes Eren Demirpolat',
                      2000,
                      'DevOps Mühendisi',
                      2000,
                      'Bilgisayar Mühendisi',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#FFFFFF] text-base sm:text-lg md:text-xl font-medium tracking-wide drop-shadow-lg opacity-100 mb-6 md:mb-8 px-2 md:px-0"
            >
              Bilgisayar Mühendisi olarak mezun oldum ve şu anda DevOps
              Mühendisi olarak çalışıyorum.
            </motion.p>

            {/* Terminal Button - Moved from absolute position to responsive layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 flex justify-center md:justify-start"
            >
              <Link href="/terminal">
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2E3440] to-[#4A9EFF] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl hover:from-[#3B4252] hover:to-[#6BAEFF] transition-all duration-300 ease-in-out transform hover:scale-105 font-mono text-xs sm:text-sm justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-[#4A9EFF]"
                  >
                    <path
                      d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 8L10 12L6 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Terminali Başlat</span>
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="w-full md:w-1/3 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
              <Image
                src="/avatar.png"
                alt="Enes Eren Demirpolat"
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
