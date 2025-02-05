"use client";

import styles from './works.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Works() {
    return (
      <div
        style={{position: 'relative',
                  height: '100vh',
                  overflow: 'auto'}}
      >
      <div
        className="fixed top-0 right-10 p-4 flex space-x-5"
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
        </Link>

        <Link
          href="/works"
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">
            Works{" "}
          </h2>
        </Link>

        <Link
          href="/trivial"
          className="group rounded-lg border border-transparent transition-colors hover:underline"
        >
          <h2 className="mb-3 text-2l font-normal">
            ???{" "}
          </h2>
        </Link>
      </div>

      <div
        className="min-h-screen overflow-auto"
        style={{ paddingTop: '5rem' }}
      >
       <div className="container mx-auto px-20 py-4">
        <h1 className="text-3xl font-bold mb-6">
          Works
        </h1>

        <p className="text-xl font-semibold mb-1 px-3">
          vufoliaを用いたUnityでのARアプリ開発(2024)
        </p>
        <p className="mb-5 px-4">
          ARアプリの開発(C#)およびアプリ内で仕様する3Dモデル制作を担当
        </p>
        <Image
          src="/image/ARApp.png"
          alt="Example Image"
          width={500}             // 必ず幅を指定
          height={300}
          className="px-4 mb-16"
        />

        <p className="text-xl font-semibold mb-1 px-3">
          サークルでの3Dアニメーション制作(2022,2023)
        </p>
        <p className="mb-1 px-4">
          Blenderを用いた3Dアニメーションの制作。2023年度は監督、動画編集(Premiere Pro)を行った。
        </p>
        <p className="mb-5 px-4">
          3Dキャラクターのアニメーション付けにはOptiTrackを用いたモーションキャプチャデータを使用している。
        </p>
        <p className="font-semibold mb-5 px-4">
          2023年度
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/WTPK9qEO5x0?si=SqSZw2_pel-rtyFK"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </p>
        <p className="font-semibold mb-10 px-4">
          2022年度
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/q-EDSNb5CKQ?si=xC2cWDby2SBPMGbm"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mb-16"
          ></iframe>
        </p>


        <p className="text-xl font-semibold mb-1 px-3">
          2023年度未踏ターゲット事業 量子計算機を用いたリザバーシステムの構築と実装
        </p>
        <p className="mb-1 px-4">
          量子リザバーの評価指標"IPC"の実装を担当(Python)
        </p>
        <a
          href="https://www.ipa.go.jp/jinzai/mitou/target/2023_reservoir/seika.html"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-shadow hover:shadow-md">
          <p className="mb-60 px-4 transition-all duration-200 hover:text-shadow">
            詳細はこちら
          </p>
        </a>

      </div> 
      </div>
    </div>
    );
  }