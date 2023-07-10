import React, {useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import C_Table from "./C_Table";

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

const curriCollection = collection(db, "curriculum");

const Curriculum = () => {

    const [curriculums, setCurriculums] = useState([]);
    const [curriname, setCurriname] = useState("");
    const [category, setCategory] = useState("");
    const [cossname, setCossname] = useState("");
    const [cosscode, setCosscode] = useState("");
    const [condition, setCondition] = useState("");
    const [credit, setCredit] = useState("");

    const columns = [
        {
          Header: "교육과정",
          accessor: "curriname",
        },
        {
            Header: "교육과정 분류",
            accessor: "category",
          },
        {
          Header: "교과목명",
          accessor: "cossname",
        },
        {
          Header: "과목 코드",
          accessor: "cosscode",
        },
        {
            Header: "과목 분류",
            accessor: "condition",
          },
        {
          Header: "학점",
          accessor: "credit",
        },
      ];

      
    const getCurriculums = async() => {
        const q = query (
            curriCollection,
            orderBy("curriname", "asc")
        );
        const consub = [];
        const results = await getDocs(q)
        results.docs.forEach((doc) => {
            consub.push({id:doc.id, ...doc.data()});
        });
        setCurriculums(consub);
    };

    useEffect (() => {
        getCurriculums();
    }, []);

    const addCurri = async () => {
        const DocRef = await addDoc
            (curriCollection, {
            curriname:curriname,
            cossname:cossname,
            cosscode:cosscode,
            category:category,
            condition:condition,
            credit:credit});

        setCurriculums(
            [...curriculums, 
            {id:DocRef.id,
            curriname:curriname,
            cossname:cossname,
            cosscode:cosscode,
            category:category,
            condition:condition,
            credit:credit}])

        setCossname("");
        setCosscode("");
        setCondition("");
        setCredit("");
    }

    const deleteCurri = (id) => {
        // 해당 id를 가진 할 일을 제외한 나머지 목록을 새로운 상태로 저장합니다.
        // setTodos(todos.filter((todo) => todo.id !== id));
        const subDoc = doc(curriCollection, id);
        deleteDoc(subDoc);
        
        setCurriculums(
          curriculums.filter((curri) => {
            return curri.id !== id;
          })
        );
      };

    


    return (
        <div className="flex place-content-between px-48 pt-24 h-[53.8rem]">
            <div className={`box w-[35%]`}>
            <div className="menu">교육과정 추가</div>
                <div>
                    <div className={`insidebox`}>
                        <div className="title">교육과정명</div>
                        <input
                        className={`w-3/5 content`}
                        placeholder="교육과정명을 입력하세요"
                        onChange={(e) => setCurriname(e.target.value)}
                        value={curriname}
                        />
                    </div>

                    <div className={`insidebox my-7`}>
                        <div className="title">교육과정 분류</div>
                        <select 
                        value={category}
                        className='content w-3/5'
                        onChange={(e) => {setCategory(e.target.value)}}
                        >
                            <option value="">교육과정 분류</option>
                            <option value="표준MD">표준MD</option>
                            <option value="연계융합MD">연계융합MD</option>
                        </select>
                    </div>         

                    <div className={`insidebox my-7`}>
                        <div className="title">교과목명</div>
                        <input
                        className='content w-3/5'
                        
                        placeholder="교과목명을 입력하세요"
                        onChange={(e) => setCossname(e.target.value)}
                        value={cossname}
                        />
                    </div>

                    <div className="insidebox my-7">
                        <div className="title">고유코드</div>
                        <input
                        className={`content w-3/5`}
                        placeholder="과목 고유코드를 입력하세요. A-1,Z-1A12"
                        onChange={(e) => setCosscode(e.target.value)}
                        value={cosscode}
                        />
                    </div>  

                    <div className={`insidebox`}>
                        <div className="title">교과목 분류</div>
                        <select 
                        value={condition}
                        className='content w-3/5'
                        onChange={(e) => {setCondition(e.target.value)}}
                        >
                            <option value="">교과목 분류</option>
                            <option value="표준필수">표준필수</option>
                            <option value="표준선택">표준선택</option>
                            <option value="연계융합">연계융합</option>
                        </select>
                    </div>                  
                    
                    <div className="insidebox my-7">
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
                        className="mr-2 w-1/4 justify-self-end p-1 mb-7 bg-indigo-700 text-white border border-indigo-700 rounded hover:bg-white hover:text-indigo-700"
                        onClick={addCurri}>교육과정 추가
                        </button>
                    </div>
                </div>
            </div>
            <div className={`box w-6/12`}>
            <div className="menu">개발 교육과정 현황</div>
                <C_Table 
                columns={columns} 
                data={curriculums}
                onDelete={deleteCurri}
                />
            </div>
        </div>

    );
};

export default Curriculum;