"use client"; // Client Componentとして扱う

import useThree from '@/hooks/useThree';
import Light_Physical from '@/hooks/light_physical';
import Link from 'next/link';

export default function Home() {
  const mountRef = Light_Physical();

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* WebGL背景用のコンテナ */}
      <div 
        ref={mountRef} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 1
        }}
      />

      {/* 半透明のフィルタレイヤー（backdrop-filterを適用） */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(0px)', // 背景をぼかす
          zIndex: 2,
        }}
      />
      {/* <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 2 }} /> */}

      <div
        className="fixed top-0 right-10 p-4 flex space-x-5"
        style={{ zIndex: 3 }}
      >
        <Link
          href="/"
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">
              Home{" "}
          </h2>
        </Link>

        <Link 
          href="/about" 
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">
            About{" "}
          </h2>
          {/* <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p> */}
        </Link>

        <Link
          href="/works"
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">
            Works{" "}
          </h2>
          {/* <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p> */}
        </Link>

        <Link
          href="/trivial"
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">
            ???{" "}
          </h2>
          {/* <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p> */}
        </Link>
      </div>
    </div>
  );
}
