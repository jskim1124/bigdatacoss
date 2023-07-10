import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSession, signIn,} from "next-auth/react";
import { AiOutlineGoogle } from "react-icons/ai";
import Image from "next/image";

export default function Signin() {
  const router = useRouter();
  const { data: session } = useSession();

  //로그인이 이미 되어 있으면 메인 페이지로 이동
  if (session) {
    router.push("/");
  }
  useEffect(() => {
    console.log(session);
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div
        className="w-[650px] h-[650px] bg-white shadow-xl rounded-3xl flex justify-center"
      >
        {session ? (
          <div className="flex flex-col justify-center text-center space-y-10">
            <div className="font-semibold text-xl">
              로그인 중입니다.
              <br />
              <br />
              잠시 기다려주세요.
            </div>
          </div>
        ) : (
            <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-indigo-700 text-2xl">빅데이터혁신융합대학 학점 이수 관리 시스템</span>
              <div>
              <Image className="" src="/빅데이터로고.png" alt="빅데이터 혁신융합대학" width={300} height={200}/>
              </div>
              <button
                className={`flex mt-7 w-4/5 items-center justify-center font-bold
                        p-4 bg-blue text-gray-lightest
                        border border-blue-500 rounded-[20px]
                        hover:bg-gray-lightest hover:text-blue`}
                onClick={() => signIn("google")}
              >
                <AiOutlineGoogle className="mr-2 text-2xl" /> {/*구글 아이콘*/}
                <span className="text-xl">소속대학 계정으로 로그인</span>
              </button>
            </div>
        )}
      </div>
    </div>
  );
}