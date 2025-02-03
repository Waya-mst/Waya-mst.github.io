"use client";

import Link from 'next/link';
import styles from './about.module.css'; // もし使うなら

export default function About() {
  return (
    <>
      {/* ナビゲーション */}
      <div className="fixed top-0 right-10 p-4 flex space-x-5">
        <Link
          href="/"
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">Home</h2>
        </Link>

        <Link
          href="/about"
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">About</h2>
        </Link>

        <Link
          href="/works"
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">Works</h2>
        </Link>

        <Link
          href="/trivial"
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">???</h2>
        </Link>
      </div>

      {/* 本文 */}
      <div
        className="min-h-screen overflow-auto"
        style={{ paddingTop: '5rem' }} // fixedヘッダーぶんの空きを確保
      >
        <div className="container mx-auto px-20 py-4">
          <h1 className="text-3xl font-bold mb-6">
            About Page
          </h1>

          <h2 className="text-xl font-semibold mt-8 mb-5 px-3">
            カメイマサト
          </h2>

          <p className="mb-3 px-4">
            2002年生まれ。現在は慶応義塾大学 理工学部 情報工学科 藤代研究室に所属。
          </p>

          <p className="mb-1 px-4">
            CG全般に興味があるが、最近は特にレンダリングやシェーディングに興味がある。
          </p>

          <p className="mb-7 px-4">
            Vulkanの勉強がきっかけで、ハードウェアの勉強も始めた。
          </p>

          <p className="mb-1 px-4">
            趣味はゲームやアニメ鑑賞。毎年2月頃に開催される色々な美大の卒業制作展に行くのが好き。
          </p>

          <p className="mb-1 px-4">
            アニメやデザインが好きということもあり、サークルでは学祭に向けた3Dアニメーションの制作/監督を経験。
          </p>

          <p className="mb-1 px-4">
            そのアニメーションに関連した部誌の表紙デザインや冊子レイアウト、ポスターデザインを担当した。
          </p>

          {/* ほかにもセクションを追加 */}
          {/* <section>...</section> */}

        </div>
      </div>
    </>
  );
}
