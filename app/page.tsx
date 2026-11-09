"use client";

import { useState } from "react";
import { courses as initialCourses } from "@/data/courses";

interface Course {
  id: string;
  name: string;
  price: number;
  seat: number;
  booked: number;
  date: string;
  tags: string[];
  badge?: string;
  icon?: string;
  description?: string;
  schedule?: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenReservation = (course: Course) => {
    // 남은 좌석이 0이면 예약 창 열지 않음
    if (course.seat - course.booked <= 0) {
      return;
    }
    setSelectedCourse(course);
    setIsSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setUserName("");
    setUserPhone("");
    setIsSuccess(false);
  };

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert("이름과 연락처를 모두 입력해 주세요.");
      return;
    }

    // 예약 가능한 좌석이 있는 경우 예약 인원 1 증가
    if (selectedCourse && selectedCourse.seat > selectedCourse.booked) {
      setCourses((prevCourses) =>
        prevCourses.map((c) =>
          c.id === selectedCourse.id
            ? { ...c, booked: c.booked + 1 }
            : c
        )
      );
    }

    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#070e1e] text-white flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* 상단 네비게이션 헤더 */}
      <header className="w-full border-b border-amber-500/20 backdrop-blur-md sticky top-0 z-40 bg-[#070e1e]/90">
        <div className="max-w-6xl mx-auto px-5 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400 animate-pulse"></span>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              스킬투머니
            </span>
          </div>
          <span className="text-xs sm:text-sm px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold tracking-wide">
            원데이 실전 강좌
          </span>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-5 py-12 sm:py-20">
        {/* 상단 소개 & 타이틀 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-5 shadow-inner">
            <span className="text-amber-400">✦</span>
            <span>배운 기술이 돈이 되는 원데이 클래스</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 break-keep">
            스킬투머니 <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">강좌 목록</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed break-keep">
            단 하루 만에 실전 기술을 마스터하고 첫 수익화에 도전해 보세요. <br className="hidden sm:inline" />
            원하는 강좌를 선택하고 지금 바로 예약을 신청하세요.
          </p>
        </div>

        {/* 강좌 카드 목록 (반응형 4열 그리드) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            const remainingSeats = course.seat - course.booked;
            const isSoldOut = remainingSeats <= 0;
            const isHurry = remainingSeats >= 1 && remainingSeats <= 2;

            return (
              <div
                key={course.id}
                className="relative flex flex-col justify-between rounded-3xl bg-[#0d1830] border border-amber-500/20 hover:border-amber-400/60 p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 group"
              >
                {/* 상단 뱃지: 마감 / 마감 임박(빨간색) / 기본 뱃지 */}
                <div className="absolute -top-3.5 right-6">
                  {isSoldOut ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 shadow-md">
                      마감
                    </span>
                  ) : isHurry ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-md shadow-red-500/30 animate-pulse">
                      마감 임박
                    </span>
                  ) : course.badge ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20">
                      {course.badge}
                    </span>
                  ) : null}
                </div>

                {/* 카드 상단: 아이콘 & 강좌명 */}
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-amber-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {course.icon || "📚"}
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                    {course.name}
                  </h2>

                  {/* 강좌 이름 바로 아래 태그 배지 */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {course.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 tracking-tight shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 강좌 일정 & 일자 */}
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-xs text-amber-300/90 font-medium">
                      📅 {course.date}
                    </span>
                    {course.schedule && (
                      <span className="text-xs text-slate-400 font-medium">
                        ⏱ {course.schedule}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[40px] break-keep">
                    {course.description || "실전 수익화 원데이 클래스"}
                  </p>

                  {/* 좌석 현황 카드 (남은 좌석 ○석 / 정원 ○명) */}
                  <div className="p-3 rounded-2xl bg-blue-950/70 border border-blue-900/50 mb-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-slate-400 font-medium">모집 현황</span>
                      {isSoldOut ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                          마감
                        </span>
                      ) : isHurry ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-red-500/20 text-red-500 border border-red-500/40 font-black animate-pulse">
                          마감 임박
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          신청 가능
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-slate-100 flex items-center justify-between">
                      <span>
                        남은 좌석{" "}
                        <strong
                          className={`text-sm font-black ${
                            isSoldOut
                              ? "text-slate-400"
                              : isHurry
                              ? "text-red-500 font-extrabold"
                              : "text-amber-400"
                          }`}
                        >
                          {remainingSeats}석
                        </strong>{" "}
                        / 정원 {course.seat}명
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({course.booked}명 예약)
                      </span>
                    </div>

                    {/* 정원 대비 예약률 프로그레스 바 */}
                    <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isSoldOut
                            ? "bg-slate-600"
                            : isHurry
                            ? "bg-red-500"
                            : "bg-emerald-400"
                        }`}
                        style={{
                          width: `${Math.min(100, (course.booked / course.seat) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 카드 하단: 수강료 & [예약하기 / 예약 마감] 버튼 */}
                <div className="pt-3 border-t border-blue-900/50 mt-1">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400">수강료</span>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-extrabold text-amber-400 tracking-tight">
                        {course.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-semibold text-amber-200 ml-1">원</span>
                    </div>
                  </div>

                  {/* 남은 좌석 0석이면 '예약 마감' 버튼 & disabled (누를 수 없음) */}
                  <button
                    type="button"
                    disabled={isSoldOut}
                    onClick={() => handleOpenReservation(course)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      isSoldOut
                        ? "bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed select-none opacity-80"
                        : "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-[0.98] cursor-pointer"
                    }`}
                  >
                    <span>{isSoldOut ? "예약 마감" : "예약하기"}</span>
                    {!isSoldOut && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 예약 신청 모달 팝업 */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#0d1830] border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative">
            {/* 닫기 버튼 */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="닫기"
            >
              ✕
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmitReservation} className="flex flex-col">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold w-fit mb-3">
                  <span>✦</span> 강좌 예약 신청
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                  {selectedCourse.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedCourse.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 tracking-tight"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-amber-400 text-lg font-extrabold">
                      {selectedCourse.price.toLocaleString()}원
                    </p>
                    <p className="text-xs text-slate-400">
                      일정: {selectedCourse.date}
                    </p>
                  </div>
                  <p className="text-xs text-slate-300 text-right">
                    남은 좌석{" "}
                    <strong className="text-amber-300 font-bold">
                      {selectedCourse.seat - selectedCourse.booked}석
                    </strong>{" "}
                    <br />
                    (정원 {selectedCourse.seat}명)
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      신청자 성함
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070e1e] border border-blue-900/60 focus:border-amber-400 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      연락처 (휴대폰 번호)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070e1e] border border-blue-900/60 focus:border-amber-400 focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-3 px-4 rounded-xl bg-blue-950/70 border border-blue-900/50 text-slate-300 font-semibold text-sm hover:bg-blue-900/50 transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-sm hover:brightness-110 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    신청 완료하기
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 text-3xl flex items-center justify-center mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white mb-2">예약 신청이 접수되었습니다!</h3>
                <p className="text-slate-300 text-sm mb-2 break-keep">
                  <strong className="text-amber-300">{selectedCourse.name}</strong> 강좌 신청이 성공적으로 완료되었습니다.
                </p>
                <p className="text-xs text-slate-400 mb-6">
                  {userName}님({userPhone})께 안내 문자를 발송해 드릴 예정입니다.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-sm hover:brightness-110 transition-all cursor-pointer"
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 하단 푸터 */}
      <footer className="w-full border-t border-amber-500/20 py-8 px-5 text-center text-xs text-slate-400 bg-[#070e1e]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 스킬투머니. 배운 기술이 돈이 되는 원데이 클래스.</p>
          <p className="text-slate-500">문의: contact@skilltomoney.com</p>
        </div>
      </footer>
    </div>
  );
}
