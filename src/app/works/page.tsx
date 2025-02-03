"use client";

import styles from './works.module.css';
import Link from 'next/link';

export default function Works() {
    return (
      <div
      style={{position: 'relative',
                 height: '100vh',
                 overflow: 'hidden'}}
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
      </div> 
      </div>
    </div>
    );
  }