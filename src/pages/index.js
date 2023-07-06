import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import Manage_S from "./components/Manage_S";
import Link from "next/link";


export default function Home() {
  const router = useRouter();
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("auth/signin");
    },
  });
  const menutext = "text-gray-500 hover:text-black flex w-24 items-center justify-center relative mr-2"
  const [showTooltip, setShowTooltip] = useState(false);
  const [showManage_S, setManage_S] = useState(false);



  return (
    <div className="w-screen h-screen bg-gray-100">

      <Head>
        <title>빅데이터혁신융합대학 학점이수 관리 시스템</title>
        <meta name="description" content="빅데이터혁신융합대학 학점이수 관리 시스템" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/빅데이터혁신융합대학.png" />
      </Head>


      <div className="bg-white shadow-md flex mx-auto border-b border-neutral-300 py-2 items-center flex place-content-between">
        <Link href="http://localhost:3000/">
          <div className="w-16 ml-8 ">
            <img src="/빅데이터혁신융합대학.png" alt="빅데이터혁신융합대학" />
          </div>
        </Link>
        <div className="flex">
          <div className={`${menutext}`}>
            <button 
            onClick={()=>{
              setManage_S(true)

            
              }}
            
            >개설 교과목</button>
          </div>
           <div className={`${menutext}`}>
            <button        
            onClick={()=>{
              setManage_S(false)
            
              }}
            >
            교육과정</button>
          </div>
          <div className={`${menutext}`}>
            <button
            onClick={()=>{
              setManage_S(false)
            
              }}
            >통계 현황</button>
          </div>
          <div className="flex w-28 items-center justify-center relative mr-2" onMouseLeave={() => setShowTooltip(false)}>
            <img className="rounded-full border border-black w-9 h-9 m-1" src={data?.user?.image} onMouseEnter={() => setShowTooltip(true)}/>
            {showTooltip && (
              <button onClick={signOut} className="w-fit top-10 pt-2 rounded shadow-md p-2 bg-white absolute">로그아웃</button>
            )}
          </div>

        </div>
      </div>
      <div className="flex place-content-between px-48 pt-24 h-screen">
        {showManage_S && (<Manage_S/>)}
      </div>

    </div>
  );
};