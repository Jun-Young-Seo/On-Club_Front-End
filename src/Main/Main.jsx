import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirstScroll from './FirstScroll';
import SecondScroll from './SecondScroll';

function Main() {
    const outerDivRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const pageCount = 3;
    const isScrolling = useRef(false); // 스크롤 잠금을 위한 ref

    useEffect(() => {
        const pageHeight = window.innerHeight;

        const wheelHandler = (e) => {
            if (isScrolling.current) return; // 스크롤 잠금 상태일 때는 무시
            e.preventDefault();
            const { deltaY } = e;

            if (deltaY > 0 && currentPage < pageCount) {
                // 스크롤 내릴 때
                isScrolling.current = true;
                setCurrentPage((prevPage) => prevPage + 1);
            } else if (deltaY < 0 && currentPage > 1) {
                // 스크롤 올릴 때
                isScrolling.current = true;
                setCurrentPage((prevPage) => prevPage - 1);
            }
        };

        const refCurrent = outerDivRef.current;
        refCurrent.addEventListener("wheel", wheelHandler);

        return () => {
            refCurrent.removeEventListener("wheel", wheelHandler);
        };
    }, [currentPage, pageCount]);

    useEffect(() => {
        const pageHeight = window.innerHeight;
        outerDivRef.current.scrollTo({
            top: pageHeight * (currentPage - 1),
            behavior: "smooth",
        });

        // 스크롤 완료 후 잠금 해제
        const unlockScroll = setTimeout(() => {
            isScrolling.current = false;
        }, 700); // 700ms 후 잠금 해제 (스크롤 완료 후)

        return () => clearTimeout(unlockScroll);
    }, [currentPage]);

    const goToNextPage = () => {
        const pageHeight = window.innerHeight;
        if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(1);
        }
    };

    return (
        <div ref={outerDivRef} style={{ overflow: "hidden", height: "100vh" }}>
            <FirstScroll/>
            <SecondScroll/>
            {/* <ThirdPage/> */}
        </div>
    );
}

export default Main;
