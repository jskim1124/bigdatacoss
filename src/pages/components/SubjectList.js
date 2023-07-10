import React, {useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import S_Table from "./S_Table";

import { db } from "@/firebase";
import {
    collection,
    query,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    orderBy,
    where,
    deleteField,
  } from "firebase/firestore"

const subCollection = collection(db, "subject");

const SubjectList = () => {

    const [subjects, setSubjects] = useState([]);
    const [semester, setSemester] = useState("");
    const [school, setSchool] = useState("");
    const [subname, setSubname] = useState("");
    const [cossname, setCossname] = useState("");
    const [cosscode, setCosscode] = useState("");
    const [subcode, setSubcode] = useState("");
    const [credit, setCredit] = useState("");
    const [subswitch, setSubswitch] = useState(false); 

    const columns = [
        {
          Header: "개설학교",
          accessor: "school",
        },
        {
          Header: "개설학기",
          accessor: "semester",
        },
        {
          Header: "개설 교과목명",
          accessor: "subname",
        },
        {
          Header: "인정 교과목명",
          accessor: "cossname",
        },
        {
          Header: "과목코드",
          accessor: "subcode",
        },
        {
          Header: "고유코드",
          accessor: "cosscode",
        },
        {
          Header: "학점",
          accessor: "credit",
        },
      ];

      
    const getSubjects = async() => {
        const q = query (
            subCollection,
            orderBy("semester", "asc")
        );
        const consub = [];
        const results = await getDocs(q)
        results.docs.forEach((doc) => {
            consub.push({id:doc.id, ...doc.data()});
        });
        setSubjects(consub);
    };

    useEffect (() => {
        getSubjects();
    }, []);

    const addSubject = async () => {
        let newcossname = cossname;
        if (cossname === "") {
            newcossname = subname;
        }

        const DocRef = await addDoc
            (subCollection, {
            semester:semester,
            school:school,
            subname:subname,
            cossname:newcossname,
            subcode:subcode,
            cosscode:cosscode,
            credit:credit});

        setSubjects(
            [...subjects, 
            {id:DocRef.id,
            semester:semester,
            school:school,
            subname:subname,
            cossname:newcossname,
            subcode:subcode,
            cosscode:cosscode,
            credit:credit}])

        setSubname("");
        setCossname("");
        setSubcode("");
        setCosscode("");
        setCredit("");
    }

    const deleteSubject = (id) => {
        // 해당 id를 가진 할 일을 제외한 나머지 목록을 새로운 상태로 저장합니다.
        // setTodos(todos.filter((todo) => todo.id !== id));
        const subDoc = doc(subCollection, id);
        deleteDoc(subDoc);
        
        setSubjects(
          subjects.filter((subject) => {
            return subject.id !== id;
          })
        );
      };

    


    return (
        <div className="flex place-content-between px-48 pt-24 h-[53.8rem]">
            <div className={`box w-[35%]`}>
            <div className="menu">교과목 추가</div>
                <div>
                    <div className={`insidebox`}>
                        <div className="title">학교 선택</div>
                        <select 
                        className='content'
                        onChange={(e) => {setSchool(e.target.value)}}
                        >
                            <option value="">개설 학교</option>
                            <option value="서울대학교">서울대학교</option>
                            <option value="경기과학기술대학교">경기과학기술대학교</option>
                            <option value="서울시립대학교">서울시립대학교</option>
                            <option value="숙명여자대학교">숙명여자대학교</option>
                            <option value="전북대학교">전북대학교</option>
                            <option value="한동대학교">한동대학교</option>
                        </select>
                    </div>

                    <div className={`insidebox`}>
                        <div className="title">개설 학기</div>
                        <input
                        className={`w-3/5 content`}
                        placeholder="연도-학기, 2023-1,2023-S,2023-2,2023-W"
                        onChange={(e) => setSemester(e.target.value)}
                        value={semester}
                        />
                    </div>
                    <div className={`insidebox `}>
                        <div className="title">개설 교과목명</div>
                        <input
                        className='content'
                        placeholder="교과목명을 입력하세요"
                        onChange={(e) => setSubname(e.target.value)}
                        value={subname}
                        />
                        <input
                        className="ml-5"
                        type="checkbox"
                        onChange ={()=>{setSubswitch(!subswitch); setCossname();}}
                        />
                        <div className={`ml-2 text-sm text-gray-400 ${subswitch && "text-black"}`}>대체교과목</div>
                    
                    </div>
                    {subswitch&& (
                    <div className={`insidebox`}>
                        <div className="title">인정 교과목명</div>
                        <input
                        className='content'
                        placeholder="교과목명을 입력하세요"
                        onChange={(e) => setCossname(e.target.value)}
                        value={cossname}
                        />
                    </div>
                    )}
                    <div className="insidebox">
                        <div className="title">과목코드</div>
                        <input
                        className={`content w-3/5`}
                        placeholder="소속대학의 과목코드를 입력하세요"
                        onChange={(e) => setSubcode(e.target.value)}
                        value={subcode}
                        />
                    </div>

                    <div className="insidebox">
                        <div className="title">고유코드</div>
                        <input
                        className={`content w-3/5`}
                        placeholder="과목 고유코드를 입력하세요. A-1,Z-1A12"
                        onChange={(e) => setCosscode(e.target.value)}
                        value={cosscode}
                        />
                    </div>                    
                    
                    <div className="insidebox">
                        <div className="title">학점</div>
                        <input
                        className={`content w-3/5`}
                        placeholder="학점을 입력하세요."
                        onChange={(e) => setCredit(e.target.value)}
                        value={credit}
                        />
                    </div>
                    <div className={`insidebox place-content-end`}>
                        <button 
                        className="mr-2 mt-5 w-1/4 justify-self-end p-1 mb-7 bg-indigo-700 text-white border border-indigo-700 rounded hover:bg-white hover:text-indigo-700"
                        onClick={addSubject}>교과목 추가
                        </button>
                    </div>
                </div>
            </div>
            <div className={`box w-6/12`}>
            <div className="menu">개설 교과목 현황</div>
                <S_Table 
                columns={columns} 
                data={subjects}
                onDelete={deleteSubject}
                />
            </div>
        </div>

    );
};

export default SubjectList;